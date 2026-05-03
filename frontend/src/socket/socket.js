import { io } from "socket.io-client";

const socket = io(
    // "http://localhost:5000",{
    "https://live-auction-house-production.up.railway.app",{
    withCredentials: true,
});

export default socket;