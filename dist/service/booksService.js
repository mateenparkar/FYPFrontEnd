"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasUserReadBook = exports.updateUserBook = exports.getLikedBooks = exports.deleteBook = exports.likeBook = exports.viewBook = exports.viewBooks = void 0;
var axios_1 = __importDefault(require("axios"));
var viewBooks = function () {
    return __awaiter(this, void 0, void 0, function () {
        var booksResponse, books, booksWithAuthors, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get('http://16.16.24.64:8080/api/books')];
                case 1:
                    booksResponse = _a.sent();
                    books = booksResponse.data;
                    booksWithAuthors = books.map(function (book) { return __awaiter(_this, void 0, void 0, function () {
                        var authorResponse, authorName, genreResponse, genreName, formattedPublishedDate, bookWithAuthor;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, axios_1.default.get("http://16.16.24.64:8080/api/author/".concat(book.author))];
                                case 1:
                                    authorResponse = _a.sent();
                                    authorName = authorResponse.data.name;
                                    return [4 /*yield*/, axios_1.default.get("http://16.16.24.64/api/genre/".concat(book.genre))];
                                case 2:
                                    genreResponse = _a.sent();
                                    genreName = genreResponse.data.genre_name;
                                    formattedPublishedDate = new Date(book.published_date)
                                        .toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' });
                                    bookWithAuthor = __assign(__assign({}, book), { authorName: authorName, formattedPublishedDate: formattedPublishedDate, genreName: genreName });
                                    return [2 /*return*/, bookWithAuthor];
                            }
                        });
                    }); });
                    return [2 /*return*/, Promise.all(booksWithAuthors)];
                case 2:
                    error_1 = _a.sent();
                    throw new Error('Could not get books with authors');
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.viewBooks = viewBooks;
var viewBook = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var bookResponse, book, authorResponse, authorName, genreResponse, genreName, formattedPublishedDate, bookWithAuthor, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, axios_1.default.get('http://16.16.24.64:8080/api/books/' + id)];
                case 1:
                    bookResponse = _a.sent();
                    book = bookResponse.data;
                    return [4 /*yield*/, axios_1.default.get("http://16.16.24.64:8080/api/author/".concat(book.author))];
                case 2:
                    authorResponse = _a.sent();
                    authorName = authorResponse.data.name;
                    return [4 /*yield*/, axios_1.default.get("http://16.16.24.64:8080/api/genre/".concat(book.genre))];
                case 3:
                    genreResponse = _a.sent();
                    genreName = genreResponse.data.genre_name;
                    formattedPublishedDate = new Date(book.published_date)
                        .toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' });
                    bookWithAuthor = __assign(__assign({}, book), { authorName: authorName, formattedPublishedDate: formattedPublishedDate, genreName: genreName });
                    return [2 /*return*/, bookWithAuthor];
                case 4:
                    error_2 = _a.sent();
                    throw new Error('Could not get book with author');
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.viewBook = viewBook;
var likeBook = function (book) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("http://16.16.24.64:8080/api/addBookToUser", book)];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    if (((_a = e_1.response) === null || _a === void 0 ? void 0 : _a.status) === 400) {
                        throw new Error('Failed to like book');
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.likeBook = likeBook;
var deleteBook = function (book) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    console.log("Running deleteBook service with book: ", book);
                    return [4 /*yield*/, axios_1.default.delete("http://16.16.24.64:8080/api/deleteBookFromUser", { data: book })];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _b.sent();
                    console.log(e_2);
                    if (((_a = e_2.response) === null || _a === void 0 ? void 0 : _a.status) != 200) {
                        throw new Error('Failed to delete book');
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.deleteBook = deleteBook;
var getLikedBooks = function (id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, book, booksWithAuthors, error_3;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get('http://16.16.24.64:8080/api/getUserBooks/' + id)];
                case 1:
                    response = _a.sent();
                    book = response.data;
                    booksWithAuthors = book.map(function (book) { return __awaiter(_this, void 0, void 0, function () {
                        var bookResponse;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, exports.viewBook)(book.book_id)];
                                case 1:
                                    bookResponse = _a.sent();
                                    return [2 /*return*/, bookResponse];
                            }
                        });
                    }); });
                    return [2 /*return*/, Promise.all(booksWithAuthors)];
                case 2:
                    error_3 = _a.sent();
                    throw new Error('Could not get liked books');
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.getLikedBooks = getLikedBooks;
var updateUserBook = function (book) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.post("http://16.16.24.64:8080/api/updateBookForUser", book)];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    if (((_a = error_4.response) === null || _a === void 0 ? void 0 : _a.status) != 200) {
                        throw new Error('Failed to delete book');
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.updateUserBook = updateUserBook;
var hasUserReadBook = function (userId, bookId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("http://16.16.24.64:8080/api/getBookDetails/".concat(userId, "/").concat(bookId))];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
                case 2:
                    error_5 = _a.sent();
                    throw new Error('Failed to check if the user has read the book');
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.hasUserReadBook = hasUserReadBook;
