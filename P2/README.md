# Práctica 2 --- Tienda

Como se pide en la Práctica 2, se ha creado una tienda usando django. La versión
de django utilizada es la 2.2.10, y funciona sobre pyhton3.

Para ejecutar esta práctica es necesario un entorno virtual. Una vez que nos encontremos
en el entorno (env), el servidor de la práctica se ejecuta. Ejemplo de ejecución:
'(env) mariagn95@mariagn95:~/github/2019-2020-LTAW-Practicas/P2/Tienda$ python manage.py runserver'

El servidor estará escuchando en el puento 8000, por lo que ahora en el navegador
web Chrome o en el Firefox nos conectamos a la URL: "localhost:8000/mi_tienda"

Una vez conectados se generará la tienda.

Todos los productos de la tienda se han añadido a partir de una base de datos
en una APP de administración que incluye django.

Todos los productos de la tienda tienen nombre, precio y stock.

En la tienda realizada se tiene una página principal en la cual se pueden ver
los 8 productos diferentes de ésta. Cada producto tiene una página en la que
se puede realizar la compra del producto. Estas páginas se realizan con plantillas.

Una vez en el cliente se encuentra en la página de uno de los productos, éste tiene
la opción de añadir al "carrito" el producto o volver a la página principal. Si desea
añadirlo al carrito debe rellenar un pequeño formulario.
Al rellenar el formulario para realizar una compra, éste se recibe en el servidor
y se inserta en la base de datos. Por lo tanto, según los datos del formulario,
los datos de la base de datos se irán actualizando. Por ejemplo, si del producto
1 hay 2 en stock y se añade solo uno al "carrito", el formulario rellenado con
esta información se envía al servidor, se actualiza la base de datos y entonces
el stock de ese producto ahora será 1.

También se ha creado una página para el "carrito", en el cual aparece un pequeño
formulario para ver la compra del cliente. Una vez rellenado, el servidor devuelve
los datos de éste y se muestra la compra realizada.

En la plantilla de los formularios de los productos y del "carrito" se incluye
la instrucción {% csrf_token %} para evitar ataques CRSF. Esto genera un token
y sólo permite recibir datos de aquellos clientes que tengan ese token.
Esto permite que no se inyecten datos no deseado en el servidor.
