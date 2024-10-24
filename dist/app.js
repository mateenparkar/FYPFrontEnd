"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var nunjucks_1 = __importDefault(require("nunjucks"));
var express_session_1 = __importDefault(require("express-session"));
var auth_1 = require("./middleware/auth");
var router_1 = __importDefault(require("./router"));
var app = (0, express_1.default)();
var appViews = path_1.default.join(__dirname, '/views/');
var nunjucksConfig = {
    autoescape: true,
    express: app,
    noCache: true
};
nunjucks_1.default.configure(appViews, nunjucksConfig);
app.set('view engine', 'html');
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
nunjucks_1.default.configure(appViews, nunjucksConfig);
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(auth_1.user);
app.use((0, express_session_1.default)({ secret: "NOT HARDCODED SECRET", cookie: { maxAge: 600000 } }));
app.use('/', router_1.default);
app.get('/', function (req, res) {
    res.redirect('/login');
});
app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});
