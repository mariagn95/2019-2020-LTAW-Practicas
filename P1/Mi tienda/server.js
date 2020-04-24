const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  let q = url.parse(req.url, true);
  console.log("Recurso solicitado (URL):" + req.url)
  console.log("Recurso:" + q.pathname)

  //-- Se define el archivo
  let filename = ""
  //-- Obtener fichero a devolver
  if (q.pathname == "/")
    filename += "index.html"
  else{
    filename = q.pathname;
  }
  type_file = filename.split(".")[1]
  filename = "." + filename

  console.log("Filename: " + filename);
  console.log("Type of file: " + type_file);

  //-- Leer fichero
  fs.readFile(filename, function(err, data) {
  //-- Fichero no encontrado. Devolver mensaje de error
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }

  //-- Tipo mime por defecto: html
  let mime = "text/html"
  //Tipo de imágenes
    if (['png', 'jpg'].includes(type_file)) {
      console.log("Cargando artículo...")
      mime = "image/" + type_file;
    }
  // CSS
    if (type_file == "css"){
      mime = "text/css";
    }

  //-- Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    res.end();
  });

}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
