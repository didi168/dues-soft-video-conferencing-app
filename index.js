const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

let meetingID = '';

app.get('/generateMeetingID', (req, res) => {
    meetingID = Math.floor(10000 + Math.random() * 90000).toString(); // Generate a random 5-digit number
    res.json({ meetingID });
  });

app.post('/verifyMeetingID', (req, res) => {
  const { enteredMeetingID } = req.body;
  if (enteredMeetingID === meetingID) {
    res.json({ isValid: true });
  } else {
    res.json({ isValid: false });
  }
});

app.get('/', (req, res) => {
  res.send('Hello! The server is running.');
});

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('A client connected');
  
  // Example event handler
  socket.on('chat message', (msg) => {
    console.log('Message from client:', msg);
    // Broadcast the message to all clients
    io.emit('chat message', msg);
  });
});

// Middleware to handle unknown routes
app.use((req, res, next) => {
  res.status(404).send('Error 404: Page not found');
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

