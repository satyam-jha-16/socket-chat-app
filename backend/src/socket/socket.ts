import {Server } from "socket.io";
import http from "http";
import express from "express";


const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors : {
    origin : ["http://localhost:3000"],
    methods : ["POST", "GET"],
  },
});

export const getRecieverSocketId = (recieverId : string) => {
  return userSocketMap[recieverId];
}

const userSocketMap : {
  [key : string] : string
} = {

  };
io.on("connection" , (socket) => {
  //console.log("a new user connected ", socket.id);

  const userId = socket.handshake.query.userId as string;
  if (userId) userSocketMap[userId] = socket.id 
  
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
   // console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export {app, io, server};
