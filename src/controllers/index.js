const Books = require('../models/bookSchema.js');
const multer = require('multer');
const uuid = require('uuid');
const path = require('path');

let avatarStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/bookCovers');
    },
    filename: function(req, file, cb) {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
})

exports.upload = multer({ storage: avatarStorage });


exports.getBooks = async(req, res) => {
    try {
        let allBooks = await Books.find({}).exec();
        res.send({ data: allBooks }).end();
    } catch (err) {
        console.log(err);
    }
}

exports.updateBook = async(req, res) => {
    try {
        const { id } = req.params
        const book = req.body;
        const update = await Books.findOneAndUpdate({ _id: id }, book, { new: true });
        res.send({ data: update }).end();
    } catch (err) {
        console.log(err)
    }
}

exports.postBook = async(req, res) => {
    try {
        let newBook = req.body;
        const { filename: image } = req.file;
        newBook.bookCover = image
        const createBook = Books.create(newBook);
        res.send(`Created new book`).end()
    } catch (err) {
        console.log(err)
    }
}

exports.getBook = async(req, res) => {
    try {
        const { id } = req.params
       
        const getOneBook = await Books.findById(id).exec();
        res.send({
            data: getOneBook
        })
    } catch (err) {
        console.log(err)
    }
}

exports.addBookCover = async(req,res) => {
    try {
        const { id } = req.params;
   
    const { filename: image } = req.file;
    const updateAvatar = await Books.findOneAndUpdate({ _id: id }, { bookCover: image }, { new: true }).exec();

    res.send({ data: updateAvatar }).end();
    console.log('book cover created or updated');
    } catch (err) {
        console.log(err)
    }
}

exports.deleteBook = async(req, res) => {
    try {
        const { id } = req.params
        const { title } = req.body;
        await Books.findByIdAndDelete(id).exec();
        res.send({
            status: "success",
            message: `Deleted book with the title ${title}`
        })
    } catch (err) {
        console.log(err)
    }
}