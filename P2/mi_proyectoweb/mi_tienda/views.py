# -- Fichero mi_tienda/views.py
from django.http import HttpResponse
from django.shortcuts import render
from random import randint
from django.template import Template, Context
from django.template.loader import get_template
from mi_tienda.models import Producto

# -- Vista principal de mi tienda
# -- El nombre de la vista puede ser cualquiera. Nosotros lo hemos
# -- llamado index, pero se podría haber llamado pepito
# -- Se recibe el mensaje HTTP de solicitud y se devuelve un mensaje HTTP de respuesta
def index(request): # -- index (es mi función de retrollada)
    return HttpResponse("Hola! esta es la página principal de Mi tienda!")


# -- Ejemplo de generacion a partir de cadenas con código html
def test1(request):

    # -- Obtener el número aleatorio
    numero = randint(0, 100)

    # Párrafo a insertar
    P = "<p>Numero aleatorio: " + str(numero) + " </p>"

    PAGINA_INI = """
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Test1</title>
      </head>
      <body>
        <h1>TEST1</h1>
    """

    PAGINA_FIN = """
      </body>
    </html>
    """
    return HttpResponse(PAGINA_INI + P + PAGINA_FIN)

# -- El mensaje de respuesta se contruye a partir del
# -- código HTML empotrado en cadenas.




# -- Ejemplo de generacion mediante una plantilla en el código
def test2(request):

    # -- Obtener el número aleatorio
    numero = randint(0, 100)

    PLANTILLA = """
    <!DOCTYPE html>
    <html lang="es" dir="ltr">
      <head>
        <meta charset="utf-8">
        <title>Test2</title>
      </head>
      <body>
        <h1>TEST2</h1>
        <p> Numero aleatorio:  {{numero}} </p>
      </body>
    </html>
    """

    # --Procesar la plantilla
    t = Template(PLANTILLA)

    # -- Crear el contexto: Asignar el numero
    c = Context({'numero': str(numero)})

    # -- Obtener la pagina html final
    html = t.render(c)

    return HttpResponse(html)

# -- La plantilla es HTML, que contiene un campo genérico {{numero}} donde
# -- se colocará el número aleatorio. Esta asociación entre el número aleatorio
# -- y la variable {{numero}} se realiza en el contexto. Luego se crea
# -- la página HTML final a partir de este contexto y se envía al cliente
# -- para su visualización




# -- Ejemplo de generacion mediante una plantilla en FICHERO
def test3(request):

    # -- Obtener el número aleatorio
    numero = randint(0, 100)

    # -- Leer la plantilla del fichero
    t = get_template('test.html')

    # -- Crear el contexto: Asignar el numero
    c = {'numero': str(numero)}

    # -- Obtener la pagina html final
    html = t.render(c)

    return HttpResponse(html)

# -- La plantilla se lee desde el fichero, mediante la función get_template()
# -- Luego se aplica el contexto, se renderiza la página y se envía la respuesta




# -- Ejemplo de uso de la función Render
def test4(request):
    # -- Obtener el número aleatorio
    numero = randint(0, 100)
    return render(request, 'test.html', {'numero':str(numero)})

# -- El proceso de la lectura de la plantilla y sustitución de las variables
# -- por su valores se puede hacer con la función render()
# -- Se le pasa como argumento el fichero de la plantilla y el direccionario
# -- con las variables y sus valores para sustituirse en la plantilla
# -- En el fichero test.html es el TEST 3 y por eso nos va a aparecer Test3



# -- Ejemplo de acceso a los recursos estáticos desde la plantilla
def test5(request):
    # -- Obtener el número aleatorio
    numero = randint(0, 100)
    return render(request, 'test5.html', {'numero':str(numero)})

# -- Se hace una plantilla que utilice recursos estáticos
# -- Para acceder a cualquier nombre de recurso estático, hay que añadir
# -- el prefijo static/. Desde las plantillas lo hacemos usando esta estructura:
# -- {% static 'nombre_recursos' %} en el html



# -- Ejemplo vista para  para leer los productos de la base de datos y
# -- mostrarlos al usuario
def list(request):
    productos = Producto.objects.all()
    html = "<h2>Listado de articulos</h2>"
    for prod in productos:
        print(prod.nombre)
        html += '<p>'+ prod.nombre + ' ' + str(prod.precio) + '<p>'
    return HttpResponse(html)

# -- Se importa el modelo de datos: Producto
# -- Luego se leen todos los productos en la varaible productos
# -- y se itera por todos los productos, generando un párrafo HTML
# -- con el nombre del producto y su precio
# -- Finalmente se envia le mensaje HTML de respuesta


# -- Ejemplo de listado de productos a partir de una plantilla
def list2(request):
    productos = Producto.objects.all()
    return render(request, 'listado.html', {'productos':productos})

# -- Se usan dos instrucciones especiales en la plantilla, delimitadas por {% y %}.
# -- Con ellas se define un bucle que recorra todos los productos.
# -- Para cada producto generamos la etiqueta HTML li (elemento de lista),
# -- con el nombre del producto y su precio



# -- Ejemplo de la vista que nos permite hacer un encargo en la tienda
def formulario1(request):
    return render(request, 'formulario1.html', {})

# -- Responde con el html del cliente


# -- Ejemplo de la vista que nos permite recibir datos
def recepcion1(request):
    # -- Obtener el nombre de la persona
    persona = request.POST['nombre']
    # -- Imprimirlo en la consola del servidor
    print(f" PEDIDO RECIBIDO!!! ----> {persona}")
    return HttpResponse("Datos recibidos!!. Comprador: " + request.POST['nombre'])

# -- Lo primero que hace esta función es leer los datos que han
# --  llegado del formulario. Lo hace a través del método POST,
# -- indicando el nombre del campo a leer. En nuestro ejemplo es "nombre"
# -- Este nombre se imprime en la consola, para verlo en el servidor,
# -- y comprobar que efectivamente se ha recibido correctametne.
# -- Se crea un mensaje de respuesta con una mini-página web que nos confirma
# -- que ha recibido los datos. y además pone el nombre que ha recibido
