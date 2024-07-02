const Koa = require('koa');
const Logger = require('koa-logger');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const http = require('http'); // Importer le module HTTP de base
const WebSocket = require('ws'); // Importer le module WebSocket

const app = new Koa();
const server = http.createServer(app.callback()); // Créer un serveur HTTP à partir de l'application Koa
const wsServer = new WebSocket.Server({ server }); // Configurer le serveur WebSocket

// Middleware et configuration existants
app.use(Logger());
app.use(cors());
app.use(bodyParser());

// Routes et autres middlewares
const router = require('./routes');
app.use(router.routes());

// Gestion des connexions WebSocket
wsServer.on('connection', (socket) => {
  console.log('Client connected to WebSocket');

  // Gestion des messages WebSocket reçus
  socket.on('message', (message) => {
    console.log('Received message:', message);
    // Traitez le message comme requis
    socket.send('Message received!');
  });

  // Gestion de la fermeture de la connexion WebSocket
  socket.on('close', () => {
    console.log('Client disconnected from WebSocket');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
