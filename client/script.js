// FUNCIÓN para iniciar el chat
(function(){
    // Declaración de constantes
    const app = document.querySelector(".app");
    const socket = io();

    // Enviar mensaje al servidor a través de socket.io (no vale vacío
    app.querySelector(".chat #send").addEventListener("click", function(){
        let msg = app.querySelector(".chat #send-msg").value;
        if(msg.length == 0){
            return;
        }
        renderMessage("m",{
            username: uname,
            text: msg
        });
        socket.emit("chat",{
            username: uname,
            text: msg
        });
        app.querySelector(".chat #msg-input").value = "";
    });
    // Salir del chat
    app.querySelector(".chat #exit").addEventListener("click", function() {
        socket.emit("exit", uname);
        window.location.href = window.location.href;
    })
    // Recibir mensajes
    socket.on("chat", function(msg){
        renderMessage("y", msg);
    });
    function renderMessage(type, message){
        let msgContainer = app.querySelector(".chat .container");
        if(type == "m"){
            let el = document.createElement("div");
            el.setAttribute("class", "m-msg");
            el.innerHTML =
                `<div>
                    <div class="name">Tú</div>
                    <div class="text">${message.username}</div>
                </div>`
                ;
                msgContainer.appendChild(el)
        } else if(type == "y") {
            let el = document.createElement("div");
            el.setAttribute("class", "y-msg");
            el.innerHTML =
                `<div>
                    <div class="name">${message.username}</div>
                    <div class="text">${message.text}</div>
                </div>`;
                msgContainer.appendChild(el);

            // Añado notificación
            addNotification(`${message.username} ha enviado un mensaje`);
        } else if(type == "update" ){
            let el = document.createElement("div");
            el.setAttribute("class", "update");
            el.innerText = message;
                msgContainer.appendChild(el);
        }
        // Scroll hacia arriba automático cuando aparece un nuevo mensaje que se verá abajo
        msgContainer.scrollTop = msgContainer.scrollHeight - msgContainer.clientHeight;
    }
    // Notificaciones
    function addNotification(text) {
        let notificationContainer = document.getElementById("notifications");
        const notificationElement = document.createElement("div");
        notificationElement.setAttribute("class", "notification");
        notificationElement.innerText = text;
        notificationContainer.appendChild(notificationElement);

        // La notificación se irá a los 5 segundos
        setTimeout(() => {
            notificationElement.remove();
        }, 5000);
    }

})();