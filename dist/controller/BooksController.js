"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksController = void 0;
var booksService_1 = require("../service/booksService");
var commentService_1 = require("../service/commentService");
var BooksController = /** @class */ (function () {
    function BooksController() {
    }
    BooksController.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var books, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, booksService_1.viewBooks)()];
                    case 1:
                        books = _a.sent();
                        res.render('books.html', { books: books, user: req.session.user });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BooksController.getOne = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, book, comment, hasReadFlag, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        id = parseInt(req.params.id, 10);
                        return [4 /*yield*/, (0, booksService_1.viewBook)(id)];
                    case 1:
                        book = _a.sent();
                        return [4 /*yield*/, (0, commentService_1.getComments)(id)];
                    case 2:
                        comment = _a.sent();
                        return [4 /*yield*/, (0, booksService_1.hasUserReadBook)(req.session.user.userId, id)];
                    case 3:
                        hasReadFlag = _a.sent();
                        res.render('book_detail.html', { books: book, hasRead: hasReadFlag, user: req.session.user, comments: comment });
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    BooksController.likeBook = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = {
                            user_id: req.session.user.userId,
                            book_id: parseInt(req.params.id, 10)
                        };
                        return [4 /*yield*/, (0, booksService_1.likeBook)(data)];
                    case 1:
                        _a.sent();
                        res.redirect('/books');
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        console.error(e_3);
                        res.locals.errormessage = e_3.message;
                        res.redirect('/books');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BooksController.deleteLikeBook = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = {
                            user_id: req.session.user.userId,
                            book_id: parseInt(req.params.id, 10)
                        };
                        return [4 /*yield*/, (0, booksService_1.deleteBook)(data)];
                    case 1:
                        _a.sent();
                        res.redirect('/books');
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        console.error(e_4);
                        res.locals.errormessage = e_4.message;
                        res.redirect('/books');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BooksController.updateUserBook = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = {
                            user_id: req.session.user.userId,
                            book_id: parseInt(req.params.id, 10),
                            read_status: "Read",
                            rating: parseInt(req.body.rating, 10),
                            date_read: new Date()
                        };
                        return [4 /*yield*/, (0, booksService_1.updateUserBook)(data)];
                    case 1:
                        _a.sent();
                        res.redirect('/books');
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        console.error(e_5);
                        res.locals.errormessage = e_5.message;
                        res.redirect('/books');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BooksController;
}());
exports.BooksController = BooksController;
