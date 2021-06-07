import { Router } from 'express';
import { getBooks, updateBook, getBook, postBook, deleteBook } from '../controllers/index.js';
import { postUserController, loginController } from '../controllers/users.js'
import auth from '../middlewares/auth.js';

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
export default router;