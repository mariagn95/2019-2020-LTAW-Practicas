//-- Cargar las dependencias
//-- Modulo express
const express = require('express')

//-- Crear una nueva aplciacion web
const app = express()

//-- Crear un servidor. Los mensajes recibidos
//-- los gestiona la app
const http = require('http').Server(app);

//-- Puerto donde lanzar el servidor
const PORT = 8080

//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});


//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Página principal

//-- Desde express podemos devolver ficheros usando el método res.sendfile().
//-- Es necesario pasar el path absoluto del fichero como argumento: 'fich'
//-- 'variable __dirname': contiene el path del directorio actual
app.get('/', (req, res) => {
  let fich = __dirname + '/index.html';
  res.sendFile(fich);
  console.log("Acceso a " + fich);
});

//-- Otra vista
app.get('/woala', (req, res) => {
  res.send('WOALA! Chuck Norris approved!! :-)');
  console.log("Acceso a /woala");
});
