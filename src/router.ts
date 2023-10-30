import express from 'express';
import { LoginController } from './controller/LoginController';
import {login} from './middleware/auth';
import { EmptyController } from './controller/emptyController';
import { RegisterController } from './controller/RegisterController';

const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);
router.get('/register', RegisterController.get);
router.post('/register', RegisterController.post);


router.get('/logout', LoginController.logOut);
router.get('/empty', EmptyController.get);
export default router