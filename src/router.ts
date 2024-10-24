import express from 'express';
import { LoginController } from './controller/LoginController';
import {login} from './middleware/auth';
import { RegisterController } from './controller/RegisterController';
import { BooksController } from './controller/BooksController';
import { CommentController } from './controller/CommentController';
import { LikedBooksController } from './controller/LikedBooksController';
import { CommunityController } from './controller/CommunityController';
import { PostController } from './controller/PostController';
import { AccountController } from './controller/AccountController';
import { LeaderboardController } from './controller/LeaderboardController';

const router = express.Router();

router.get('/login', LoginController.get);
router.post('/login', LoginController.post);
router.get('/register', RegisterController.get);
router.post('/register', RegisterController.post);
router.get('/books', login, BooksController.getAll);
router.get('/books/:id', login, BooksController.getOne);

router.get('/logout', LoginController.logOut);
router.get('/likeBook/:id', BooksController.likeBook);
router.post('/postComment/:id', CommentController.postComment)
router.get('/view-liked-books', login, LikedBooksController.getLikedBooks);
router.get('/community', login, CommunityController.get);
router.post('/addPost', login, PostController.post);
router.get('/post-to-community', login, PostController.get);
router.post('/deleteLikeBook/:id', login, BooksController.deleteLikeBook);
router.get('/account', login, AccountController.get)
router.post('/api/account', login, AccountController.update)
router.post('/updateBook/:id', login, BooksController.updateUserBook);
router.get('/leaderboard', LeaderboardController.get);
export default router