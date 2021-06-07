const express = require('express');
const morgan = require('morgan');
const bookRouter = require('./routes/index.js');
const dotenv = require('dotenv');
dotenv.config();

const { startDb } = require('./db/index.js');

const hostname = "localhost";
const port = process.env.port || 3000;

startDb();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/', bookRouter);


// app.get('/', (req, res) => {
//     res.json({
//         status: "success",
//         message: "Welcome to the book api server"
//     });
// });

app.listen(port, hostname, () => {
    console.log(`Server listening at http://${hostname}:${port}`)
});