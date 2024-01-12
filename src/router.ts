import express from 'express';
import { LoginController } from './controller/LoginController';
import {login} from './middleware/auth';
import { RegisterController } from './controller/RegisterController';
import { BooksController } from './controller/BooksController';

const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);
router.get('/register', RegisterController.get);
router.post('/register', RegisterController.post);
router.get('/books', login, BooksController.getAll);
router.get('/books/:id', login, BooksController.getOne);

router.get('/logout', LoginController.logOut);
export default router