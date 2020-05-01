from django.urls import path

# -- Importar todas las vistas de mi_tienda
from . import views

# -- Aquí se definen las URLs de nuestra tienda
# -- Metemos de momento sólo la principal (índice)

"""
La URL a nivel de mi_tienda sea la cadena vacía ""

Cada vez que se reciba el recurso "" en mi tienda,se llamará a la función
index() definida en views.py

Se le asigna la etiqueta "index" (name) para que podamos referenciar esta vista
desde las plantillas
"""

urlpatterns = [
    # -- Vista pricipal (índice)
    path('', views.index, name='index'),
]
