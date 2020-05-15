# Práctica 1 --- Mi tienda

Como se pide en la Práctica 1, se ha construido un servidor web usando Node.js,
que sirve las páginas de la web de Mi tienda.

Las páginas son estáticas (en HTML), y consisten en textos e imágenes,
compartiendo dos hoja de estilo (CSS), una para el index (style.css) y otra para
los artículos de la tienda (articulo.css).

La tienda consta de 8 productos, los cuales son recreaciones de superhéroes.

Para utilizar la tienda se comienza abriendo un terminal en la carpeta "Mi tienda".
Una vez abierto se ejecuta el servidor desde node. Ejemplo de ejecución:
'mariagn95@mariagn95:~/github/2019-2020-LTAW-Practicas/P1/Mi tienda$ node server.js'

El servidor estará escuchando en el puento 8080, por lo que ahora en el navegador
web Chrome o en el Firefox nos conectamos a la URL: "localhost:8080"

El servidor es un programa, escrito en node.js (javascript), que recibe
peticiones de los clientes. Detecta qué es lo que pide el cliente, accede al
sistema de ficheros local, localiza el recurso pedido y lo devuelve.

En el navegador se podrá ver la respuesta del servidor, que es la tienda creada.

En la tienda se observará la página principal (index.html) y otra página
diferente al seleccionar algún artículo de la tienda (articuloX.html).

Cuando se selecciona un articulo de la tienda o se vuelva a la página principal
de ésta, todo estará registrado en el terminal.
En el terminal se podrá ver la petición del cliente en la que podrá observar el
recurso solicitado, el recurso, el nombre y el tipo de fichero.

Sin embargo, si se accede a un recursos no existente, en este caso el carrito,
genera una respuesta de error, ya que no existe el recurso solicitado.
