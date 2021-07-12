const { Router } = require('express');
const { getBooks, updateBook, getBook, postBook, deleteBook, upload } = require('../controllers/index.js');
const { postUserController, loginController } = require('../controllers/users.js')
// const auth = require('../middlewares/auth.js');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: " BOOKSTORE API SERVER WITH MONGOOSE  "
    })
});

router.get('/books/list', getBooks);
router.patch('/books/update/:id', updateBook);
router.get('/books/:id', getBook);
router.post('/books/create', upload.single('bookCover'), postBook);
router.delete('/books/delete/:id', deleteBook);


router.post('/user/register', postUserController);
router.post('/user/login', loginController);

module.exports = router;