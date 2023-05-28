const express = require("express");
const app = express();

// Mise en place d'une socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const path = require('path');
const cors = require('cors');
const { Board, Led } = require("johnny-five");
const SerialPort = require('serialport');

const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });
const board = new Board({ port });

// Chemin relatif vers un fichier ou un répertoire
const relativePath = './public/index.html';

// Obtenez le chemin absolu
const absolutePath = path.resolve(relativePath);

var state = null;

//board.on("ready", () => {

// Options de CORS
const corsOptions = {
  origin: ['http://172.16.0.3:8000', 'http://10.7.100.237:8000', 'http://10.106.96.1:8000'],
};

app.use(cors(corsOptions));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(absolutePath);
});

app.get('/on', (req, res) => {
  const led = new Led(13);
  led.on();
  res.send({ msg: "on" });
});

app.get('/off', (req, res) => {
  const led = new Led(13);
  led.off();
  res.send({ msg: "off" });
});

// Gestion des connexions socket.io
io.on('connection', (socket) => {
  console.log('A user connected');
  // Diffuse le message à tous les clients connectés
  io.emit('action', state);

  socket.on('s-id', (id_value) => {
    console.log('id:', id_value);
  });

  socket.on('action', (type) => {
    state = type;
    io.emit('action', type);
  });

  // Gestion de la déconnexion
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(8000);
//});
