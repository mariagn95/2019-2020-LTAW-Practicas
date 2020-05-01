console.log("Holaaaaaaaaaa")

  var boton = document.getElementById('boton')
  var img = document.getElementById('logo')

/*
 .getElementById sólo está disponible como un método del objeto global document,
y no se encuentra disponible como un método en todos los objetos  del DOM. Como
los valores ID deben ser únicos a traves del documento, no existe necesidad para
 versiones "locales" de la función.
*/

  var img_on = true;

  boton.onclick= () => {
    if (img_on) {
      img.style.display="None"
      img_on = false
    }
    else {
      img.style.display = "inline"
      img_on = true
    }
  }
