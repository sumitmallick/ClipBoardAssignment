const express = require('express');
// const { default: mongoose } = require('mongoose');
const path = require('path');
const mongoose = require('./database');
const shiftsRouter = require('./routes/shifts');

const app = express();
// mongoose();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/shifts', shiftsRouter);

app.listen(3000, () => console.log('Server started on port 3000'));
