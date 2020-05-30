const usuario = document.getElementById('usuario');
const factura = document.getElementById('factura');
const buscar = document.getElementById('buscar');



//-- Cuando el usuario aprieta el botón de ver los productos
buscar.onclick = ()=>{
  //-- Crear objeto para hacer peticiones AJAX
  const m = new XMLHttpRequest();
  //-- Configurar la petición
  m.open("GET","http://localhost:8080/carrito?usuario=" + usuario.value, true);
  //-- Cuando haya alguna noticia sobre la peticion
  //-- ejecuta este código
  m.onreadystatechange=function(){
     //-- Petición enviada y recibida. Todo OK!
     if (m.readyState==4 && m.status==200){
       //-- La respuesta es un objeto JSON
       let carrito = JSON.parse(m.responseText)
       console.log(carrito);
       factura.innerHTML = "";
       for (var i = 0; i < carrito.length; i++) {
         factura.innerHTML += carrito[i][0] + " " + carrito[i][1] + " unidad/es";
       }
     }
   }
   //-- Enviar la petición!
   m.send();
}
