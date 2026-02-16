import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

let socket: Socket | null = null

export function connectSocket(token: string) {
    if (!socket) {
        socket = io(SOCKET_URL, {
            transports: ["websockets"],
            auth: {
                token
            }
        });
    }
    return socket;
}

export function getSocket() {
    return socket;
}

export function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}