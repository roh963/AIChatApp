import socketIOClient from 'socket.io-client';

let socketInstance = null;

export const initializeSocket = (projectId) => {
    socketInstance = socketIOClient(import.meta.env.VITE_API_URL, {
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
            projectId
        },
        transports: ['websocket'], // ✅ Force WebSocket transport only
    });

    // Optional: Log connection errors for easier debugging
    socketInstance.on('connect_error', (err) => {
        console.error('Socket connection error:', err.message);
    });

    return socketInstance;
};

export const receiveMessage = (eventName, cb) => {
    if (!socketInstance) return console.warn('Socket not initialized');
    socketInstance.on(eventName, cb);
};

export const sendMessage = (eventName, data) => {
    if (!socketInstance) return console.warn('Socket not initialized');
    socketInstance.emit(eventName, data);
};
