const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

require('dotenv').config();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${
    process.env.DB_HOST
  }/${process.env.DB_DATABASE}`,
  {
    useNewUrlParser: true
  }
);

app.use(cors());

//Middware - Deixando o io global para a aplicação
app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(express.json());
app.use(require('./routes'));

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
