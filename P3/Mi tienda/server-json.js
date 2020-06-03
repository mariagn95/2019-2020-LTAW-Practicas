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
const productos = ["THOR", "IRONMAN", "CAPITÁN AMÉRICA", "WONDERWOMAN", "SPIDERMAN", "SUPERMAN", "HULK", "BATMAN"];
const precios = [45.0, 70.0, 55.0, 60.0, 40.0, 65.0, 50.0, 80.0];
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
    case "/html/THOR.html":
    case "/html/BATMAN.html":
    case "/html/CAPITANAMERICA.html":
    case "/html/HULK.html":
    case "/html/IRONMAN.html":
    case "/html/SPIDERMAN.html":
    case "/html/WONDERWOMAN.html":
    case "/html/SUPERMAN.html":
    case "/html/registro.html":
    case "/html/carrito.html":
    case "/html/pago.html":
    case "/html/factura.html":
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
      case "/css/pago.css":
      case "/css/factura.css":
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
      case "/img/tipodepago.png" :
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
            console.log("Usuario: " + data.split('&')[2].split('=')[1]);

            //--Cookie
            let usuario = data.split('&')[2].split('=')[1];
            let nombre = data.split('&')[0].split('=')[1];
            let apellido = data.split('&')[1].split('=')[1];
            let registrado = false;

            //console.log("Cookie: " + cookie.split('; '));
            if (cookie){
              for (let name in cookie.split('; ')) {
                console.log(" ");
                console.log("--- Cookies de los datos del registro---");
                console.log(cookie.split('; ')[name].split('=')[0]);
                if (cookie.split('; ')[name].split('=')[0] == usuario){
                  registrado = true;
                }
              }
            }
            //-- Guardamos la cookie
            if (!registrado) {
              res.setHeader('Set-Cookie', usuario + "=" + nombre + "&" + apellido + "&[]&0.0");
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

        //-- Buscar producto
        case "/buscar":
          if (req.method == "POST"){
            console.log(" ");
            console.log("--- Producto buscado ---");
            //--chunk lee los datos registrados
            req.on('data', chunk =>{
              data = chunk.toString()
              console.log("Producto: " + data.split('=')[1]);
              let filename = data.split('=')[1].replace("+","") + ".html";
              //--Volvemos a la página de inicio
              fs.readFile("./html/"+ filename, (err, data) => {
                //-- Generar el mensaje de respuesta
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
                return
              });
              return
            });
          }
          break;



        //-- Registro
        case "/seleccionados":
          if (req.method == "POST"){
            console.log(" ");
            console.log("--- Productos seleccionados ---");
            //--chunk lee los datos registrados
            req.on('data', chunk =>{
              data = chunk.toString()
              console.log("Usuario: " + data.split('&')[0].split('=')[1]);
              console.log("Nombre del producto: " + data.split('&')[1].split('=')[0]);
              console.log("Cantidad: " + data.split('&')[1].split('=')[1]);

              let usuario = data.split('&')[0].split('=')[1];
              let nombre_producto = data.split('&')[1].split('=')[0];
              let cantidad = parseFloat(data.split('&')[1].split('=')[1]);
              let registrado = false;
              let carrito = [];
              let precio = 0.0;
              let nombre = "";
              let apellido = "";
              if (cookie){
                for (let name in cookie.split('; ')) {

                  if (cookie.split('; ')[name].split('=')[0] == usuario){
                    console.log(" ");
                    console.log("--- Cookies de los productos seleccionados ---");
                    console.log(cookie.split('; ')[name]);
                    //--Convertios el carrito a JSON
                    carrito = JSON.parse(cookie.split('; ')[name].split('&')[2]);
                    precio = parseFloat(cookie.split('; ')[name].split('&')[3]);
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
                    //--Coge el precio segun su posicion
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
                for (var j = 0; j < productos.length; j++) {
                  if (productos[j] == nombre_producto) {
                      precio += cantidad*precios[j];
                  }
                }
                filename = "./index.html";
                res.setHeader('Set-Cookie', usuario + "=" + nombre + "&" + apellido + "&" + JSON.stringify(carrito) + "&" + precio.toString())
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


          case "/carrito":
            console.log("Parametros: " + params.usuario);

            let registrado = false;
            let precio = 0.0;
            let carrito = "";
            //console.log("Cookie: " + cookie.split('; '));
            if (cookie){
              for (let name in cookie.split('; ')) {

                if (cookie.split('; ')[name].split('=')[0] == params.usuario){
                  console.log(" ");
                  console.log("--- Cookies del carrito ---");
                  console.log(cookie.split('; ')[name].split('=')[0]);
                  registrado = true;
                  //--Convertios el carrito a JSON
                  carrito = cookie.split('; ')[name].split('&')[2];
                  precio = parseFloat(cookie.split('; ')[name].split('&')[3]);
                }
              }
            }


            if (registrado) {
              res.setHeader('Content-Type', 'application/json')
              res.write(JSON.stringify([JSON.parse(carrito), precio]));
              res.end();
              return
            }

            break

            //-- Factura
            case "/pagar":
              if (req.method == "POST"){
                var pedido_final = ``;
                console.log(" ");
                console.log("--- Datos del formulario de pago ---");
                //--chunk lee los datos registrados
                req.on('data', chunk =>{
                  data = chunk.toString()
                  console.log(data)
                  console.log("Nombre: " + data.split('&')[0].split('=')[1]);
                  console.log("Apellido: " + data.split('&')[1].split('=')[1]);
                  console.log("Usuario: " + data.split('&')[2].split('=')[1]);
                  console.log("Email: " + data.split('&')[3].split('=')[1]);
                  console.log("Dirección de envio: " + data.split('&')[4].split('=')[1]);
                  console.log("Código postal: " + data.split('&')[5].split('=')[1]);
                  console.log("Telefono: " + data.split('&')[6].split('=')[1]);
                  console.log("Método de pago: " + data.split('&')[7].split('=')[1]);

                  let nombre = data.split('&')[0].split('=')[1];
                  let apellido = data.split('&')[1].split('=')[1];
                  let usuario = data.split('&')[2].split('=')[1];
                  let email = data.split('&')[3].split('=')[1].replace("%40","@") ;
                  let direccion = data.split('&')[4].split('=')[1]  ;
                  let cpostal = data.split('&')[5].split('=')[1];
                  let telefono = data.split('&')[6].split('=')[1];
                  let mpago = data.split('&')[7].split('=')[1];

                  let registrado = false;
                  let carrito = [];
                  let producto = "";
                  let precio = 0.0;

                  if (cookie){
                    for (let name in cookie.split('; ')) {
                      if (cookie.split('; ')[name].split('=')[0] == usuario){
                        console.log(" ");
                        console.log("--- Cookies de los productos seleccionados ---");
                        console.log(cookie.split('; ')[name]);
                        //--Convertios el carrito a JSON
                        carrito = JSON.parse(cookie.split('; ')[name].split('&')[2]);
                        precio = parseFloat(cookie.split('; ')[name].split('&')[3]);
                        registrado = true;
                        console.log(carrito);
                        console.log(precio);

                        pedido_final =`
                          <!DOCTYPE html>
                          <html lang="es" dir="ltr">
                            <head>
                              <meta charset="utf-8">
                              <title> Factura </title>
                              <link href="https://fonts.googleapis.com/css?family=Raleway:400,700" rel="stylesheet">
                              <link rel="stylesheet" href="../css/factura.css">
                            </head>
                            <body>
                              <div class="cabecera">

                                  <div class="logo">
                                    <center>
                                      <img src="../img/logo.png">
                                    </center>
                                  </div>

                              </div>
                              <h1><center> FACTURA </center></h1>
                              <p class="pedido">`

                              pedido_final += "<u><strong>Datos del Cliente</strong></u>" + "<br>"
                                      + "<strong>Nombre:   </strong>" + nombre + "<br>"
                                      + "<strong>Apellido:   </strong>" + apellido + "<br>"
                                      + "<strong>Usuario:   </strong>" + usuario + "<br>"
                                      + "<strong>Correo electrónico:   </strong>" + email + "<br>"
                                      + "<strong>Método de pago utilizado:   </strong>" + mpago + "<br>"
                                      + "<br>"
                                      + "<strong>Productos comprados:   </strong>" + " "+ carrito + " " + "<br>"
                                      + "<strong>Precio total del pedido:   </strong>" + precio + " €" + "<br>"
                                      + "<br>"
                                      + "<strong>* La compra será enviada a la dirección proporcionada anteriormente lo antes posible</strong>"
                                      + "<br>"
                                      + "<br>"
                                      + "<strong>¡MUCHAS GRACIAS POR REALIZAR SU COMPRA EN SUPERHERO!</strong>"
                                pedido_final +=



                              `</p>
                              <center>
                              <a href="../index.html"><button>Seguir comprando</button></a>
                              </center>

                            </body>

                          </html>`
                      }
                    }
                  }
                  res.statusCode = 200;
                  });

                  req.on ('end', () =>{
                    res.setHeader('Content-Type', 'text/html')
                    res.write(pedido_final);
                    res.end();
                    return
                  });

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
