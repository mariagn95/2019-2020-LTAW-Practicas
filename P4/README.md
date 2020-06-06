# Práctica 4 --- Chat

En la Práctica 4 se pide realizar un chat en el que múltiples usuarios puedan hablar
entre sí a partir de un servidor hecho con nodejs.

Antes de nada, hay que saber que en esta práctica se utiliza la infraestructura web
Express y la tecnología WebSocket. Hay que instalarlos para poder utilizar el
chat realizado. Los comando de instalación son:

---> npm install express

---> npm install socket.io

Se utilizan Express y WebSockets, para poder tener una comunicación Cliente-Servidor bidireccional. El servidor de la práctica se ejecuta. Ejemplo de ejecución: mariagn95@mariagn95:~/github/2019-2020-LTAW-Practicas/P4/Chat$ node chat-server.js


En el chat se pueden conectar varios usuarios. Cada vez que un usuario se conecta,
el servidor le envía un mensaje de Bienvenida ("¡Bienvenido a Chating!"), y
además anuncia al resto de usuarios que se encuentran en el chat, que hay un
usuario nuevo conectado.

Para conectarse hay que introducir el Nick que se quiera utilizar para el chat,
pero si no se quiere introducir ninguno, se asigna el Nick "null".

La conexión al servidor se realiza a partir del navegador web, ya sea Chrome o
Firefox. Una vez conectado el servidor, devuelve la página html y los ficheros
javascript y de estilo.

El servidor, además, interpreta y responde a estos comandos:

    /help: Devuelve la lista con todos los comandos soportados
    /list: Devuelve número de usuarios conectados
    /hello: Devuelve el saludo del servidor
    /date: Devuelve la fecha


El servidor sólo envía la información de estos comandos al usuario que se la ha
pedido. El resto de mensajes que no sean comandos sí los re-envía a los
usuarios conectados en el chat.

*En Chrome se visualiza mejor el css realizado.
