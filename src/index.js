import express from 'express';
import morgan from 'morgan';
import bookRouter from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();

import { startDb } from './db/index.js';

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