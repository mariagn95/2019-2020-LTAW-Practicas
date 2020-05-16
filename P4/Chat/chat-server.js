//-- Cargar las dependencias
//-- Modulo express
const express = require('express')

//-- Crear una nueva aplciacion web
const app = express()

//-- Crear un servidor. Los mensajes recibidos
//-- los gestiona la app
const http = require('http').Server(app);

//-- Biblioteca socket.io en el lado del servidor
const io = require('socket.io')(http);

//-- Puerto donde lanzar el servidor
const PORT = 8080

//-- Usuarios del Chat
var users = 0;

//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Página principal
app.get('/', (req, res) => {
  let path = __dirname + '/index.html';
  res.sendFile(path);
  console.log("Accediendo al index");
  console.log("  ");
});

//-- Página del cliente
app.get('/chat-client.js', (req,res)=>{
  res.sendFile(__dirname + '/chat-client.js');
  console.log("Fichero de JavaScrip solicitado ");
  console.log("  ");
});

//-- Hoja de estilo
app.get('/css/style.css', (req,res)=>{
  res.sendFile(__dirname + '/css/style.css');
  console.log("Fichero de css solicitado ");
  console.log("  ");
});


//-- El resto de peticiones se interpretan como
//-- ficheros estáticos
app.use('/', express.static(__dirname +'/'));

//------ COMUNICACION POR WEBSOCKETS
//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){

  //-- Usuario conectado. Imprimir el identificador de su socket
  console.log('--> Usuario conectado!');
  msg_res = "--> Nuevo usuario conectado";
  io.emit('new_message', msg_res);

  //-- Le damos la bienvenida
  msg_welcom = "   ¡Bienvenido a Chating!   ";
  socket.emit('new_message', msg_welcom);

  //-- Nuevo cliente
  socket.on('new_client', (nick) => {
    console.log(nick + " está conectado");
    users += 1;
    //-- Mensaje del cliente
    socket.on('new_message', (msg) =>{
      console.log('Mensaje recibido');
      io.emit('new_message', msg);
    });

  });

  //-- Usuario desconectado. Imprimir el identificador de su socket
  socket.on('disconnect', function(){
    console.log("--> Usuario Desconectado.");
    users -= 1;
  });
});