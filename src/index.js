const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://will:147963@cluster0-rmwqy.mongodb.net/goweek', {
    useNewUrlParser: true
});

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

