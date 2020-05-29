///-- Modulos utilizados
const http = require('http');
const url = require('url');
const fs = require('fs');

//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

//-- Array con los productos disponibles en la tienda
//-- Usamos un array, pero podría ser un objeto genérico
//-- Por simplicidad lo inicializamos con valores constantes, pero
//-- en una aplicación real este array se obtendría de la base
//-- de datos
let productos = ["THOR", "IRONMAN", "CAPITÁN AMÉRICA", "WONDERWOMAN", "SPIDERMAN", "SUPERMAN", "HULK", "BATMAN"];

//-- Funcion para atender a una Peticion
//-- req: Mensaje de solicitud
//-- res: Mensaje de respuesta
function peticion(req, res) {
  //-- Mostrar en la consola el recurso al que se accede
  const q = url.parse(req.url, true);
  //-- Leer los parámetros recibidos en la peticion
  let params = q.query;
  let cookie = req.headers.cookie;
  console.log("Petición: " + q.pathname);

  //-- Segun el recurso al que se accede
  switch (q.pathname) {

    //-- Pagina principal
    case "/":
    case"/index.html":
      fs.readFile("./index.html", (err, data) => {
        //-- Generar el mensaje de respuesta
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
        return
      });
      break;

    //-- Paginas de los productos
    case "/html/articulo1.html":
    case "/html/articulo2.html":
    case "/html/articulo3.html":
    case "/html/articulo4.html":
    case "/html/articulo5.html":
    case "/html/articulo6.html":
    case "/html/articulo7.html":
    case "/html/articulo8.html":
    case "/html/registro.html":
    case "/html/carrito.html":
      fs.readFile("." + q.pathname, (err, data) => {
        //-- Generar el mensaje de respuesta
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
        return
      });
      break;

      //-- Hojas de estilo
      case "/css/style.css":
      case "/css/articulo.css":
      case "/css/registro.css":
      case "/css/carrito.css":
        fs.readFile("." + q.pathname, (err, data) => {
          //-- Generar el mensaje de respuesta
          res.writeHead(200, {'Content-Type': 'text/css'});
          res.write(data);
          res.end();
          return
        });
        break;

      //-- Imágenes
      case "/img/1.jpg":
      case "/img/2.jpg" :
      case "/img/3.jpg" :
      case "/img/4.jpg" :
      case "/img/5.jpg" :
      case "/img/6.jpg" :
      case "/img/7.jpg" :
      case "/img/8.jpg" :
      case "/img/carrito.png" :
      case "/img/foto-cabecera.jpg" :
      case "/img/github.png" :
      case "/img/logo.png" :
        fs.readFile("." + q.pathname, (err, data) => {
          //-- Generar el mensaje de respuesta
          res.writeHead(200, {'Content-Type': 'image/' + q.pathname.split(".")[1] == "jpg" ? "jpg": "png"});
          res.write(data);
          res.end();
          return
        });
        break;

    //-- Fichero js cliente
    case "/client.js":
    case "/client_carrito.js":
      fs.readFile("." + q.pathname, (err, data) => {
        //-- Generar el mensaje de respuesta
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.write(data);
        res.end();
        return
      });
      break;


      //-- Acceso al recurso JSON
      case "/myquery":



        //-- No hacemos nada con ellos, simplemente los mostramos en
        //-- la consola
        console.log("Parametros: " + params.producto);

        //-- El array de productos lo pasamos a una cadena de texto,
        //-- en formato JSON:
        content = JSON.stringify(productos) + '\n';

        //-- Generar el mensaje de respuesta
        //-- IMPORTANTE! Hay que indicar que se trata de un objeto JSON
        //-- en la cabecera Content-Type
        res.setHeader('Content-Type', 'application/json')
        res.write(content);
        res.end();
        return
        break

      //-- Registro
      case "/registro":
        if (req.method == "POST"){
          console.log(" ");
          console.log("--- Datos registrados ---");
          //--chunk lee los datos registrados
          req.on('data', chunk =>{
            data = chunk.toString()
            console.log("Nombre: " + data.split('&')[0].split('=')[1]);
            console.log("Apellido: " + data.split('&')[1].split('=')[1]);
            console.log("Email: " + data.split('&')[2].split('=')[1]);

            //--Cookie
            let email = data.split('&')[2].split('=')[1];
            let nombre = data.split('&')[0].split('=')[1];
            let apellido = data.split('&')[1].split('=')[1];
            let registrado = false;

            //console.log("Cookie: " + cookie.split('; '));
            if (cookie){
              for (let name in cookie.split('; ')) {
                console.log(" ");
                console.log("--- Cookies ---");
                console.log(cookie.split('; ')[name].split('=')[0]);
                if (cookie.split('; ')[name].split('=')[0] == email){
                  registrado = true;
                }
              }
            }

            //-- Guardamos la cookie
            if (!registrado) {
              res.setHeader('Set-Cookie', email + "=" + nombre + "&" + apellido + "&[]");
            }

            //--Volvemos a la página de inicio
            fs.readFile("./index.html", (err, data) => {
              //-- Generar el mensaje de respuesta
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              res.end();
              return
            });

            return
          });
        }
        break

        //-- Registro
        case "/seleccionados":
          if (req.method == "POST"){
            console.log(" ");
            console.log("--- Productos seleccionados ---");
            //--chunk lee los datos registrados
            req.on('data', chunk =>{
              data = chunk.toString()
              console.log("Email: " + data.split('&')[0].split('=')[1]);
              console.log("Nombre del producto: " + data.split('&')[1].split('=')[0]);
              console.log("Cantidad: " + data.split('&')[1].split('=')[1]);

              let email = data.split('&')[0].split('=')[1];
              let nombre_producto = data.split('&')[1].split('=')[0];
              let cantidad = parseInt(data.split('&')[1].split('=')[1]);
              let registrado = false;
              let carrito = [];
              let nombre = "";
              let apellido = "";
              if (cookie){
                for (let name in cookie.split('; ')) {
                  console.log(" ");
                  console.log("--- Cookies ---");
                  console.log(cookie.split('; ')[name]);
                  if (cookie.split('; ')[name].split('=')[0] == email){
                    //--Convertios el carrito a JSON
                    carrito = JSON.parse(cookie.split('; ')[name].split('&')[2]);
                    //--Sacamos nombre y apellido
                    nombre = cookie.split('; ')[name].split('&')[0].split('=')[1];
                    apellido = cookie.split('; ')[name].split('&')[1];
                    registrado = true;
                  }
                }
              }
              let comprado = false;
              //--Si el carrit  no esta vacio buscamos producto
              if (carrito != []){
                for (var i = 0; i < carrito.length; i++) {
                  //-Nombre del producto : carrito[i][0];

                  if (carrito[i][0] == nombre_producto) {
                    carrito[i][1] += cantidad;
                    comprado = true;
                  }
                }
              }

              //--Si el producto no esta en el carrito lo añadimos a la lista
              if (!comprado){
                carrito.push([nombre_producto, cantidad]);
              }

              if (!registrado) {
                filename = "./html/registro.html";

              }else {
                filename = "./index.html";
                res.setHeader('Set-Cookie', email + "=" + nombre + "&" + apellido + "&" + JSON.stringify(carrito))
              }

              //--Volvemos a la página de inicio
              fs.readFile(filename, (err, data) => {
                //-- Generar el mensaje de respuesta
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
                return
              });

              return
            });

          }
          break

          //-- Acceso al recurso JSON
          case "/carrito":


            //-- No hacemos nada con ellos, simplemente los mostramos en
            //-- la consola
            console.log("Parametros: " + params.email);

            let registrado = false;
            let carrito = "";
            //console.log("Cookie: " + cookie.split('; '));
            if (cookie){
              for (let name in cookie.split('; ')) {
                console.log(" ");
                console.log("--- Cookies ---");
                console.log(cookie.split('; ')[name].split('=')[0]);
                if (cookie.split('; ')[name].split('=')[0] == params.email.replace(/[@]/,"%40")){
                  registrado = true;
                  //--Convertios el carrito a JSON
                  carrito = cookie.split('; ')[name].split('&')[2];
                }
              }
            }

            if (registrado) {
              res.setHeader('Content-Type', 'application/json')
              res.write(carrito);
              res.end();
              return
            }

            break

    //-- Se intenta acceder a un recurso que no existe
    default:
      content = "Error";
      res.statusCode = 404;
      //-- Generar el mensaje de respuesta
      res.setHeader('Content-Type', 'text/html')
      res.write(content);
      res.end();
  }

}

//-- Inicializar el servidor
//-- Cada vez que recibe una petición
//-- invoca a la funcion peticion para atenderla
const server = http.createServer(peticion)

//-- Configurar el servidor para escuchar en el
//-- puerto establecido
server.listen(PUERTO);

console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO)
