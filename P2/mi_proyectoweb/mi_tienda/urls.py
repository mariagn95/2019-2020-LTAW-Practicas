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
    path('test1/', views.test1, name='test1'),
    path('test2/', views.test2, name='test2'),
    path('test3/', views.test3, name='test3'),
    path('test4/', views.test4, name='test4'),
    path('test5/', views.test5, name='test5'),
    path('list/', views.list, name='list'),
    path('list2/', views.list2, name='list2'),
    path('formulario1/', views.formulario1, name='formulario1'),
    path('recepcion1/', views.recepcion1, name='recepcion1'),
]
