from django.urls import path

# -- Importar todas las vistas de mi_tienda
from . import views

# -- Aquí se definen las URLs de nuestra tienda
# -- Metemos de momento sólo la principal (índice)


urlpatterns = [
    # -- Vista pricipal (índice)
    path('', views.index, name='index'),
    # -- URL para todos los productos
    path('<prodnombre>-prod.html', views.producto, name='producto'),
    path('carrito', views.carrito, name='carrito'),
    path('mostrar_carrito', views.mostrar_carrito, name='mostrar_carrito'),
    path('comprar', views.comprar, name='comprar'),
]
