import express from 'express';
import { LoginController } from './controller/LoginController';
import {login} from './middleware/auth';
import { EmptyController } from './controller/emptyController';

const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);

router.get('/logout', LoginController.logOut);
router.get('/empty', EmptyController.get);
export default router