// this is the entry point for the app
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');


const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

mongoose.connect('mongodb://127.0.0.1/mongooseTodoAppDb')
  .then(() => {
    console.log('Connected to the DB');
  });


// Path: server.js
app.listen(PORT, () => console.log('Yeeee!!!'));

