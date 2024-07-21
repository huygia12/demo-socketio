import express, { Express, Request, Response, Application } from "express";
import http from "http";
import { API_v1 } from "./src/routes";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { ClientToServerEvents, ServerToClientEvents } from "./declares";
import { instrument } from "@socket.io/admin-ui";

const PORT: number = 8000;

const app: Application = express();
app.use("/", API_v1);

const httpServer: http.Server = http.createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

instrument(io, {
  auth: false,
  mode: "development",
});

io.on(
  "connection",
  (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
    socket.on("clientMsg", (data) => {
      console.log({ socket: socket.id, ...data });
      if (data.room === "") {
        io.sockets.emit("serverMsg", data);
      } else {
        socket.join(data.room);
        io.to(data.room).emit("serverMsg", data);
      }
    });
  }
);

httpServer.listen(PORT, () => {
  console.info(`App running on port ${PORT}`);
});
