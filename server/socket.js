
// Importo la función de verificación del token
const { verifyToken } = require('../api/utils/handle.JWT.util');

module.exports = function configureSocket(io) {

    //Autenticación del token
    io.use((socket, next) => {
        const token = socket.handshake.query.token;
        if (!token) {
            return next(new Error("Token not received."));
        }
        try {
            const decoded = verifyToken(token);
            socket.user = decoded;  
            next(); 
        } catch (err) {
            return next(new Error("Authentication error")); 
        }
    });

    // Conexión del socket
    io.on('connection', (socket) => {
        console.log(`Usuario conectado: ${socket.id} (Usuario: ${socket.user.username})`);

        // Para la lista de usuario conectados
        socket.emit('users', Object.fromEntries(users));
        // Para los mensajes
        messages.forEach(msg => {
            socket.emit('groupMessage', msg);
        });
        // Registro de usuario
        socket.on('register', (username) => {
            users.set(socket.id, username);
            socket.emit('notification', `Bienvenido, ${username}!`);
            socket.broadcast.emit('notification', `${username} se ha unido al chat`);
            io.emit('users', Object.fromEntries(users));
        });
        // Mensajes
        socket.on('groupMessage', (message) => {
            const username = users.get(socket.id);
            if (!username) return;

            const msg = { user: username, message, timestamp: Date.now() };
            messages.push(msg);
            // Va a ser un máximo de 100 mensajes. Se irá eliminando el mmás antiguo
            if (messages.length > MAX_MESSAGES) {
                messages.shift();
            }
            io.emit('groupMessage', msg);
        });

        // Desconexión
        socket.on('disconnect', () => {
            const username = users.get(socket.id);
            if (username) {
                users.delete(socket.id);
                io.emit('notification', `${username} se ha ido del chat`);
                io.emit('users', Object.fromEntries(users));
            }
            console.log(`Usuario desconectado: ${socket.id}`);
        });
    });
};
