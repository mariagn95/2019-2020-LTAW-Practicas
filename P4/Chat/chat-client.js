function main() {
  var nick = prompt("¿Qué Nick quieres para el chat?");
  console.log("Ejecutando cliente JS...");

  //-- Obtener los elementos del DOM
  const display = document.getElementById("display");
  const msg = document.getElementById("msg");
  const send = document.getElementById("send");

  //-- Crear un websocket. Se establece la conexión con el servidor
  const socket = io();

  //-- Se envia al Usuario
  socket.emit('new_client', nick);

  //-- Botón de envío apretado
  send.onclick = () => {
    //-- Se envía el mensaje escrito
    //-- Usamos el nombre 'msg' para los mensajes de usuario
    //-- Si no se ha introducido ningún mensaje, no se envía
    if (msg.value)
      socket.emit('new_message', msg.value)
      console.log("Mensaje enviado");
    //-- Borramos el mensaje escrito
    msg.value="";
  }

  //-- Se ha recibido un mensaje
  socket.on('new_message', (msg) => {
    //-- Añadirlo al párrafo display
    display.innerHTML += "<br> > " + msg;
  });
}
