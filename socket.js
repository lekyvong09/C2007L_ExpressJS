let io;

module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer, {
            cors: {
                origin: 'http://localhost:3000',
                method: ['GET', 'POST'],
                allowedHeaders: ['my-custom-header'],
                credentials: true
            }
        });
        return io;
    },
    getIO: () => {
        if (!io) {
            throw new Error('');
        }
        return io;
    }

    
}

