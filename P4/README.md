# Práctica 4 --- Chat

En la Práctica 4 se pide realizar un chat en el que múltiples usuarios puedan hablar
<<<<<<< HEAD
entre sí a partir de un servidor hecho con node.

Antes de nada, hay que saber que en esta práctica se utiliza la infraestructura web
Express y la tecnologia WebSocket. Hay que instalarlos para poder utilizar el
chat realizado. Los comando de instalación son:

---> npm install express

---> npm install socket.io

En el chat se pueden conectar varios usuarios. Cada vez que un usuario se conecta,
el servidor le envia un mensaje de Bienvenida ("¡Bienvenido a Chating!"), y
además anuncia al resto de usuarios que se encuentran en el char, que hay un
=======
entre sí a partir de un servidor hecho con node.

Antes de nada, hay que saber que en esta práctica se utiliza la infraestructura web
Express y la tecnologia WebSocket. Hay que instalarlos para poder utilizar el
chat realizado. Los comando de instalación son:
			---> npm install express
			---> npm install socket.io

En el chat se pueden conectar varios usuarios. Cada vez que un usuario se conecta,
el servidor le envia un mensaje de Bienvenida ("¡Bienvenido a Chating!"), y
además anuncia al resto de usuarios que se encuentran en el char, que hay un
>>>>>>> 5f67b6dc631793e0932f73a5335431112e108954
usuario nuevo conectado.

Para conectarse hay que introducir el Nick que se quiera utilizar para el chat,
pero si no se quiere introducir ninguno, se asigna el Nick "null".

<<<<<<< HEAD
La conexión al servidor se realiza a partir del navegador web, ya sea Chrome o
Firefox. Una vez conectado el servidor, devuelve la página html y los ficheros
javascript y de estilo.

El servidor, además, interpreta y responde a estos comandos:
=======
La conexión al servidor se realiza a partir del navegador web, ya sea Chrome o
Firefox. Una vez conectado el servidor, devuelve la página html y los ficheros
javascript y de estilo.

El servidor, además, interpreta y responde a estos comandos:

>>>>>>> 5f67b6dc631793e0932f73a5335431112e108954
    /help: Devuelve la lista con todos los comandos soportados
    /list: Devuelve número de usuarios conectados
    /hello: Devuelve el saludo del servidor
    /date: Devuelve la fecha


<<<<<<< HEAD
El servidor sólo envía la información de estos comandos al usuario que se la ha
pedido. El resto de mensajes que no sean comandos sí los re-envía a los
usuarios conectados en el chat.

*En Chrome se visualiza mejor el css realizado.
=======
El servidor sólo envía la información de estos comandos al usuario que se la ha
pedido. El resto de mensajes que no sean comandos sí los re-envía a los
usuarios conectados en el chat.

*En Chrome se visualiza mejor el css realizado.


>>>>>>> 5f67b6dc631793e0932f73a5335431112e108954
