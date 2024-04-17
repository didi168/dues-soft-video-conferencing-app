const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 8080;

app.use(cors()); // Enable CORS for all routes

app.get("/", (req, res) => {
    res.send("Hello World");
});



// Store call IDs and corresponding sockets
const callIdMap = new Map();

io.on("connection", (socket) => {
    socket.emit("me", socket.id);

    // Handle disconnect event
    socket.on("disconnect", () => {
        // If the disconnected socket is associated with a call ID, remove it from the map
        callIdMap.forEach((value, key) => {
            if (value === socket.id) {
                callIdMap.delete(key);
            }
        });
        socket.broadcast.emit("callEnded");
    });

    // Handle call initiation event
    socket.on("startCall", (callId) => {
        // Store the call ID and associated socket ID in the map
        callIdMap.set(callId, socket.id);
    });

    // Handle call request event
    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        // Check if the call ID exists in the map
        if (callIdMap.has(userToCall)) {
            // Get the socket ID associated with the call ID
            const calleeSocketId = callIdMap.get(userToCall);
            // Emit the callUser event to the callee socket
            io.to(calleeSocketId).emit("callUser", { signal: signalData, from, name });
        } else {
            // Handle case where the call ID doesn't exist (e.g., notify the caller)
            console.log(`Call ID ${userToCall} not found`);
        }
    });

    // Handle call answer event
    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));