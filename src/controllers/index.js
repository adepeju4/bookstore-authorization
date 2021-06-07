const Books = require('../models/bookSchema.js');


exports.getBooks = async(req, res) => {
    try {
        const allBooks = await Books.find({}).exec();
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
        const newBook = req.body;
        const createBook = Books.create(newBook);
        res.send(`Created new book ${JSON.stringify(createBook)}`).end()
    } catch (err) {
        console.log(err)
    }
}

exports.getBook = async(req, res) => {
    try {
        const { id } = req.params
        const { title } = req.body;
        const getOneBook = await Books.findById(id).exec();
        res.send({
            data: getOneBook
        })
    } catch (err) {
        console.log(err)
    }
}

exports.deleteBook = async(req, res) => {
    try {
        const { id } = req.params
        const { title } = req.body;
        const deleteBook = Books.findByIdAndDelete(id).exec();
        res.send({
            status: "success",
            message: `Deleted book with the title ${title}`
        })
    } catch (err) {
        console.log(err)
    }
}