const http = require('http');
const PUERTO = 8080

//-- Configurar el servidor
http.createServer( (req, res) => {
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)
}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)


//-- URL
//-- localhost:8080
//-- localhost:8080/hola
//-- localhost:8080/tienda/producto1.html
