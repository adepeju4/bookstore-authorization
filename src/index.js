const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bookRouter = require('./routes/index.js');
const dotenv = require('dotenv');
dotenv.config();

const { startDb } = require('./db/index.js');

const hostname = "localhost";
const port = process.env.PORT || 3000;

startDb();

const app = express();
app.use(express.static('public')); 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/', bookRouter);



app.listen(port, hostname, () => {
    console.log(`Server listening at http://${hostname}:${port}`)
});