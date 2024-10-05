import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { socket } from "./routes/socket.js";

const app = express();
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

socket(io);

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
