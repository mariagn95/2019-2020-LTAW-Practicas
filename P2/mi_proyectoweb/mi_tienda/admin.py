# -- Fichero mi_tienda/admin.py
from django.contrib import admin
from mi_tienda.models import Producto

# -- Se registra el fichero para poder gestionar los datos
admin.site.register(Producto)
