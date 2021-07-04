import socketClient  from "socket.io-client";
//const SOCKET_URL = "http://127.0.0.1:3001";
const SOCKET_URL = process.env.REACT_APP_API_URL;
export const socket = socketClient(SOCKET_URL);