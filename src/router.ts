import express from 'express';
import { LoginController } from './controller/LoginController';
import {login} from './middleware/auth';

const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);

router.get('/logout', LoginController.logOut);


export default router