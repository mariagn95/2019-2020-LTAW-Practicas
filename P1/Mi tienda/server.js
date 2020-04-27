const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  //-- Se parsea la URL
  let q = url.parse(req.url, true);
  console.log("Recurso solicitado (URL):" + req.url)
  console.log("Recurso:" + q.pathname)

  //-- Se define el archivo
  let filename = ""
  //-- Obtener fichero a devolver
  if (q.pathname == "/") //--http://localhost:8080/
    filename += "/index.html"  //--Página principal
  else{
    filename = q.pathname; //-- q.pathname es otro recurso que se pide en el localhost
  }
  //-- Para sacar el tipo de archivo
  type_file = filename.split(".")[1] //--Se coge la extensión del archivo
  filename = "." + filename //--Para leer el archivo. Sin "." no funciona

  console.log("Filename: " + filename);
  console.log("Type of file: " + type_file);

  //-- Leer fichero
  fs.readFile(filename, function(err, data) {
  //-- Fichero no encontrado. Devolver mensaje de error
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }
    //-- Si no da error --> 200 OK
    //-- Tipo mime por defecto: html --> TIPO DE ARCHIVO
    let mime = "text/html"
    //Tipo de imágenes
    if (type_file == 'png' || type_file == 'jpg') {
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
