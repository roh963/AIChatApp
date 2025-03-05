import http from "http"
import app from "./app.js"
import { JWT_SECRET, PORT } from "./const.js"
import jwt from "jsonwebtoken"
import { Server } from "socket.io"
import mongoose from "mongoose"
import projectModel from "./model/project.model.js"

const port = PORT || 3000

const server = http.createServer(app)
const io = new Server(server,{
  cors: {
    origin: '*',
  }
});

io.use(async(socket,next)=>{
  try {
       const token = socket.handshake.auth?.token ||socket.handshake.headers.authorization.split(' ')[1];
       const projectId = socket.handshake.query?.projectId;
       if(!mongoose.Types.ObjectId.isValid(projectId)){
         return next("Invalid project id");
       }
       socket.project = await projectModel.findById(projectId);
       if (!token ) {
          return next(new Error('Authentication error'));
       }
        const decoded = jwt.verify(token,JWT_SECRET);
        if(!decoded) {
          return next(new Error('Authentication error'));
        }
        socket.user=decoded;
        next();
  } catch (error) {
     next(error);
  }
})

io.on('connection', (socket) => {
  socket.roomId = socket.project._id.toString()
  console.log('a user connected');

  socket.join(socket.roomId);
  socket.on(`project-message`,(data)=> {
    socket.broadcast.to(socket.roomId).emit(`project-message`,data);
  });
 
  socket.on(`disconnect`,()=> { 
    console.log('a user disconnected');
    socket.leave(socket.roomId);
   });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
