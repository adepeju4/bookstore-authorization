const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connection.on('connected', () => {
    console.log('Db connected');
})

mongoose.connection.on('disconnected', (err) => {
    console.warn(`Db disconnected because of ${err}`);
})

mongoose.connection.on('error', (err) => {
    console.error(`Could not connect because of ${err}`);
    process.exit(-1);
})


exports.startDb = () => {
    process.env.db;
    mongoose.connect(process.env.db, {
        keepAlive: 1,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
};