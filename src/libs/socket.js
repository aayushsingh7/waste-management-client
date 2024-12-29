// lib/socket.js
import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      // Reconnection options
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,

      // Connection options
      transports: ["websocket"],
      autoConnect: true,

      // Additional options you might need
      path: "/socket.io",
      withCredentials: true,
    });

    // Socket event listeners
    socket.on("connect", () => {
      console.log("Socket connected!", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected!", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  }

  return socket;
};

// Clean up function for when you need to destroy the connection
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
