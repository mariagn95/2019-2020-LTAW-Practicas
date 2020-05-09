from django.shortcuts import render
from mi_tienda.models import Producto, Carrito
import json
# -- Vista principal de mi tienda
# -- El nombre de la vista puede ser cualquiera. Nosotros lo hemos
# -- llamado index, pero se podría haber llamado pepito
# -- Se recibe el mensaje HTTP de solicitud y se devuelve un mensaje HTTP de respuesta
def index(request): # -- index (es mi función de retrollada)
    # -- Se reponde con la plantilla y el contexto
    return render(request, 'index.html', {'productos': Producto.objects.all()})

#-- Devuelve la respuesta y la URL del producto
def producto(request, prodnombre):
    #-- Se busca el producto y se selecciona
    p = Producto.objects.get(nombre__startswith=prodnombre)
    return render(request, 'producto.html', {'prod': p})

def carrito(request):
    return render(request, 'carrito.html', {'carrito': ''})


def mostrar_carrito(request):
    try:
        c = Carrito.objects.get(nombre=request.POST['nombre']).pedido
        p = Carrito.objects.get(nombre=request.POST['nombre']).total
    except:
        c = ''
        p = 0.0
    return render(request, 'carrito.html', {'carrito': json.loads(c), 'precio': p})


def comprar(request):
    try:
        c = Carrito.objects.get(nombre=request.POST['nombre'])
    except:
        c = Carrito(nombre=request.POST['nombre'])

    p = Producto.objects.get(nombre__startswith=request.POST['producto'])
    n = int(request.POST['cantidad'])
    carro = json.loads(c.pedido)
    if p.stock - n >= 0:
        if p.nombre  in carro:
            carro[carro.index(p.nombre)+1][0] += 1
        else:
            carro.append(p.nombre)
            carro.append([1])

        c.pedido = json.dumps(carro)
        c.total += p.precio
        c.save()
        p.stock -= n
        p.save()
    return render(request, 'index.html', {'productos': Producto.objects.all()})
