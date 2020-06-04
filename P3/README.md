#Práctica 3 --- Mi tienda

Como se pide en la Práctica 3, se ha creado una tienda usando Formularios, cookies y peticiones AJAX.
Con ellos se implementan tres nuevas características al servidor web tienda de la práctica 1.
Se ha implementado formulario de compra, carrito de la compra y búsqueda con autocompletado.

Para utilizar la tienda el servidor de la práctica se ejecuta. Ejemplo de ejecución:
mariagn95@mariagn95:~/github/2019-2020-LTAW-Practicas/P3/Mi tienda$ node server-json.js'

El servidor estará escuchando en el puento 8080, por lo que ahora en el navegador web Chrome o en el Firefox
nos conectamos a la URL: "localhost:8080"

Para tener carrito de la compra y poder seleccionar los productos que se quieren comprar, el usuario deberá
registrarse primero en la tienda. Para ello pinchará en el boton "Registro" y el servidor creará una cookie
con un identificador de usuario conocido.

En cada producto hay la opción de seleccionar más de un producto y un botón de añadir al carrito, pero para
poder comprar el producto se debe utilizar el usuario del cliente que esté realizando la compra.
Sin embargo, si el cliente quiere realizar la compra de un producto y al introducir tu usuario no está registrado,
se tendrá que registrar como se ha explicado antes.
El botón añadir al carrito hace que el servidor añada el producto a la cookie.

En el carrito, se pide el nombre del usuario utilizado en la tienda para poder visualizar la compra realizada.
Al introducir el nombre de usuario como se pide, el servidor lee los productos que se ha comprado ese usuario de la cookie,
y los muestra como respuesta.

Una vez visualizada la compra, te da la opción de finalizar compra, donde se muestra un formulario para que el cliente rellene
los datos de envio y método de pago.
Cuando ya se haya completado el formulario al darle al boton comprar, el servidor volverá a leer los productos que se ha comprado ese usuario
de la cookie,  y los motrará como respuesta visualizando una página con la factura. En esta página además se dará la opción de
seguir comprando.


Además, la tienda tiene una caja de búsqueda, para buscar el producto por su nombre. Al escribir 3 ó más caracteres,
aparece el producto buscado. Al apretar el botón de buscar se envía esta información, y el servidor devuelve una página
del producto buscado.
