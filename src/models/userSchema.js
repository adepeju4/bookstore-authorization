import pkg from 'mongoose';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
    },
}, { timestamps: true });


export const User = mongoose.model('user', userSchema);