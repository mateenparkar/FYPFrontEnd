"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var LoginController_1 = require("./controller/LoginController");
var auth_1 = require("./middleware/auth");
var RegisterController_1 = require("./controller/RegisterController");
var BooksController_1 = require("./controller/BooksController");
var CommentController_1 = require("./controller/CommentController");
var LikedBooksController_1 = require("./controller/LikedBooksController");
var CommunityController_1 = require("./controller/CommunityController");
var PostController_1 = require("./controller/PostController");
var AccountController_1 = require("./controller/AccountController");
var LeaderboardController_1 = require("./controller/LeaderboardController");
var streakController_1 = require("./controller/streakController");
var GroqController_1 = require("./controller/GroqController");
var router = express_1.default.Router();
router.get('/login', LoginController_1.LoginController.get);
router.post('/login', LoginController_1.LoginController.post);
router.get('/register', RegisterController_1.RegisterController.get);
router.post('/register', RegisterController_1.RegisterController.post);
router.get('/books', auth_1.login, BooksController_1.BooksController.getAll);
router.get('/books/:id', auth_1.login, BooksController_1.BooksController.getOne);
router.get('/logout', LoginController_1.LoginController.logOut);
router.get('/likeBook/:id', BooksController_1.BooksController.likeBook);
router.post('/postComment/:id', CommentController_1.CommentController.postComment);
router.get('/view-liked-books', auth_1.login, LikedBooksController_1.LikedBooksController.getLikedBooks);
router.get('/community', auth_1.login, CommunityController_1.CommunityController.get);
router.post('/addPost', auth_1.login, PostController_1.PostController.post);
router.get('/post-to-community', auth_1.login, PostController_1.PostController.get);
router.post('/deleteLikeBook/:id', auth_1.login, BooksController_1.BooksController.deleteLikeBook);
router.get('/account', auth_1.login, AccountController_1.AccountController.get);
router.post('/api/account', auth_1.login, AccountController_1.AccountController.update);
router.post('/updateBook/:id', auth_1.login, BooksController_1.BooksController.updateUserBook);
router.get('/leaderboard', LeaderboardController_1.LeaderboardController.get);
router.get('/streak', auth_1.login, streakController_1.StreakController.get);
router.post('/updateStreak', auth_1.login, streakController_1.StreakController.updateStreak);
router.post('/generateQuestions', auth_1.login, GroqController_1.GroqController.generateQuestions);
exports.default = router;
