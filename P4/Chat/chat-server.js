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
  console.log("  ");
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
  msg_res = " --- [Nuevo usuario conectado] ---";
  io.emit('new_message', msg_res);

  //-- Le damos la bienvenida
  msg_connection = "   ¡Bienvenido a Chating!   ";
  socket.emit('new_message', msg_connection);
  users += 1;

  //-- Nuevo cliente
  socket.on('new_client', (nick) => {
    console.log(">" + nick + "está conectado");

    //-- Mensaje del cliente
    socket.on('new_message', (msg) =>{
      console.log('Mensaje recibido: ' + msg);

      //-- El servidor, además, responderá a estos comandos:
      if (msg == '/help'){
        msg = 'Comandos del servidor: ' + "<br>" +
              '/help : Devuelve la lista con todos los comandos soportados' + "<br>" +
              '/list : Devuelve número de usuarios conectados' + "<br>" +
              '/hello : Devuelve el saludo del servidor' + "<br>" +
              '/date : Devuelve la fecha';

        io.emit('new_message', msg);

      }else if (msg == '/list'){
        msg = 'Usuarios conectados: ' + users;
        io.emit('new_message', msg);

      }else if (msg == '/hello'){
        msg = '¡HOLA! Espero que tenga una conversación agradable';
        io.emit('new_message', msg);

      }else if (msg == '/date'){
        var d = new Date();
        var yy = d.getFullYear();
        var mm = d.getMonth();
        var dd = d.getDate();
        msg = 'Fecha: ' + dd + '/' + mm + '/' + yy;
        io.emit('new_message', msg);

      }else{
        io.emit('new_message', msg);
      }
    });

  });

  //-- Usuario desconectado. Imprimir el identificador de su socket
  socket.on('disconnect', function(){
    console.log("--> Usuario Desconectado");
    msg_desconnect = " ---[Usuario Desconectado] ---";
    io.emit('new_message', msg_desconnect);
    users -= 1;
  });
});
