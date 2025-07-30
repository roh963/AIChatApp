import http from "http";
import app from "./app.js";
import { FRONTEND_URL, JWT_SECRET, PORT } from "./const.js";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import mongoose from "mongoose";
import projectModel from "./model/project.model.js";
import { generateResult } from "./services/ai.services.js";

const port = PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["websocket"]  // Force websocket only
});

// Middleware for Socket authentication
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(" ")[1];
    const projectId = socket.handshake.query?.projectId;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new Error("Invalid project ID"));
    }

    const project = await projectModel.findById(projectId);
    if (!project) {
      return next(new Error("Project not found"));
    }

    if (!token) {
      return next(new Error("Authentication token missing"));
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return next(new Error("Invalid token"));
    }

    socket.user = decoded;
    socket.project = project;
    next();
  } catch (error) {
    next(new Error("Socket auth failed: " + error.message));
  }
});

// Handle socket connection
io.on("connection", (socket) => {
  const roomId = socket.project._id.toString();
  socket.join(roomId);
  console.log("✅ User connected to project:", roomId);

  // Broadcast messages
  socket.on("project-message", async (data) => {
    const message = data.message;
    const aiIsPresentInMessage = message.includes("@ai");

    // Send to others (except sender)
    socket.broadcast.to(roomId).emit("project-message", data);

    // If AI is mentioned
    if (aiIsPresentInMessage) {
      const prompt = message.replace("@ai", "").trim();
      const result = await generateResult(prompt);

      io.to(roomId).emit("project-message", {
        message: result,
        sender: {
          _id: "ai",
          email: "AI"
        }
      });
    }
  });

  socket.on("disconnect", () => {
    socket.leave(roomId);
    console.log("❌ User disconnected from project:", roomId);
  });
});

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
