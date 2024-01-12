import express, {type Application, type Request, type Response} from 'express';
import path from 'path';
import nunjucks from 'nunjucks';
import expressSession from 'express-session';
import { user } from './middleware/auth';
import { User } from './model/auth';
import router from './router';



const app:Application = express();

const appViews = path.join(__dirname, '/views/');

const nunjucksConfig = {
    autoescape: true,
    express: app,
    noCache:true
};

nunjucks.configure(appViews, nunjucksConfig);

app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

nunjucks.configure(appViews, nunjucksConfig);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(user)

app.use(expressSession({ secret: "NOT HARDCODED SECRET", cookie: {maxAge: 600000} }))

declare module "express-session" {
    interface SessionData {
        token?: string;
        user?: User;
    }
}

app.use('/', router);

app.get('/',(req:Request, res:Response) => {
    res.redirect('/login')
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
