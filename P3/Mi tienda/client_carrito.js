const usuario = document.getElementById('usuario');
const factura = document.getElementById('factura');
const buscar = document.getElementById('buscar');
const total = document.getElementById('precio');
const compra = document.getElementById('compra');
const finalizar = document.getElementById('finalizar');

function init(){
  $(function(){
    $('#compra').hide();
  });
}


//-- Cuando el usuario aprieta el botón de ver los productos
buscar.onclick = ()=>{
  $(function(){
    $('#compra').show();
  });
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
       console.log(m.responseText)
       let carrito = JSON.parse(m.responseText)[0]
       let precio = JSON.parse(m.responseText)[1]
       console.log(carrito);
       factura.innerHTML = "";
       for (var i = 0; i < carrito.length; i++) {
         factura.innerHTML += carrito[i][0] + " " + carrito[i][1] + " unidad/es<br>";
       }
       total.innerHTML = precio.toString();
     }
   }
   //-- Enviar la petición!
   m.send();
}
