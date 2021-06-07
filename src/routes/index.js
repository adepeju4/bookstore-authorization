const { Router } = require('express');
const { getBooks, updateBook, getBook, postBook, deleteBook } = require('../controllers/index.js');
const { postUserController, loginController } = require('../controllers/users.js')
const auth = require('../middlewares/auth.js');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: " BOOKSTORE API SERVER WITH MONGOOSE  "
    })
});

router.get('/books/list', auth, getBooks);
router.patch('/books/update/:id', auth, updateBook);
router.get('/books/:id', auth, getBook);
router.post('/books/create', auth, postBook);
router.delete('/books/delete/:id', auth, deleteBook);


router.post('/user/register', postUserController);
router.post('/user/login', loginController);

module.exports = router;