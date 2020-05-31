//-- Traza de prueba
console.log("Hola!")

//-- Obtener el botón de VER del DOM
const ver = document.getElementById('ver');

const buscar = document.getElementById('buscar');


//-- Registro
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const usuario = document.getElementById('usuario');



buscar.onkeyup = ()=>{
  ver.onclick = "location.href='" + ver.value.replace(" ", "") + ".html'";
}
//-- Cuando el usuario aprieta el botón de ver los productos
ver.onclick = ()=>{
  //-- Crear objeto para hacer peticiones AJAX
  const m = new XMLHttpRequest();
  //-- Configurar la petición
  m.open("GET","http://localhost:8080/myquery?producto=" + buscar.value, true);
  //-- Cuando haya alguna noticia sobre la peticion
  //-- ejecuta este código
  m.onreadystatechange=function(){
     //-- Petición enviada y recibida. Todo OK!
     if (m.readyState==4 && m.status==200){
       //-- La respuesta es un objeto JSON
       let productos = JSON.parse(m.responseText)
       console.log(productos);
     }
   }
   //-- Enviar la petición!
   m.send();
}
