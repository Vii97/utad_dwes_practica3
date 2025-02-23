// Inicializo la conexión IO
const socket = io();

// Declaro constantes
const form = document.getElementById('form');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const messagesDiv = document.getElementById('messages');
const notificationsDiv = document.getElementById('notifications');
const usersList = document.getElementById('users-list');

// Declaro variables de usuarios, y usuarios conectados.
let currentUser = null;
let onlineUsers = new Map();

// FUNCIONES
function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}

function createMessageElement(msg, isSent = false) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${isSent ? 'sent' : 'received'}`;
    
    const usernameElement = document.createElement('div');
    usernameElement.className = 'username';
    usernameElement.textContent = msg.user;
    
    const textElement = document.createElement('div');
    textElement.className = 'text';
    textElement.textContent = msg.message;
    
    messageElement.appendChild(usernameElement);
    messageElement.appendChild(textElement);
    
    return messageElement;
}

function addNotification(text) {
    const notificationElement = document.createElement('div');
    notificationElement.textContent = text;
    notificationsDiv.appendChild(notificationElement);
    scrollToBottom(notificationsDiv);
    
    // QUe se vaya la notificacióna los 5 segundos
    setTimeout(() => {
        notificationElement.remove();
    }, 5000);
}

function updateOnlineUsers() {
    usersList.innerHTML = '';
    onlineUsers.forEach((username, id) => {
        const li = document.createElement('li');
        li.textContent = username;
        usersList.appendChild(li);
    });
}

// Event Listeners para mandar mensajes
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (username && !currentUser) {
        currentUser = username;
        socket.emit('register', username);
        usernameInput.disabled = true;
        messageInput.focus();
    }

    if (currentUser && message) {
        socket.emit('groupMessage', message);
        messageInput.value = '';
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
});

// websockets
socket.on('connect', () => {
    addNotification('Conectado');
});

socket.on('disconnect', () => {
    addNotification('Desconectado');
    onlineUsers.clear();
    updateOnlineUsers();
});

socket.on('users', (users) => {
    onlineUsers = new Map(Object.entries(users));
    updateOnlineUsers();
});

socket.on('groupMessage', (msg) => {
    const isSent = msg.user === currentUser;
    const messageElement = createMessageElement(msg, isSent);
    messagesDiv.appendChild(messageElement);
    scrollToBottom(messagesDiv);

    if (!isSent) {
        addNotification(`${msg.user} ha enviado un mensaje`);
    }
});

socket.on('notification', (notification) => {
    addNotification(notification);
});