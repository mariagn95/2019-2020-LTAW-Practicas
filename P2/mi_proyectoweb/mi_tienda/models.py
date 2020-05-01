
from django.db import models

# -- Se crea la clase Producto y dentro de ella definimos estos tres campos
# -- Nombre, Stock y Precio
class Producto(models.Model):
    """Modelo de datos de mis productos"""

    nombre = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    precio = models.FloatField()

# -- El método __str__(self), que un método reservado que usa python
# -- para obtener una cadena que represente a ese objeto
    # -- Usamos el nombre para identificar
    # -- el producto
    def __str__(self):
        return self.nombre
