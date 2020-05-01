# -- Fichero mi_tienda/views.py
from django.http import HttpResponse

# -- Vista principal de mi tienda
# -- El nombre de la vista puede ser cualquiera. Nosotros lo hemos
# -- llamado index, pero se podría haber llamado pepito
# -- Se recibe el mensaje HTTP de solicitud y se devuelve un mensaje HTTP de respuesta
def index(request): # -- index (es mi función de retrollada)
    return HttpResponse("Hola! esta es la página principal de Mi tienda!")
