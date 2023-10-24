import express, {type Application} from 'express';
import path from 'path';
import nunjucks from 'nunjucks';



const app:Application = express();

const appViews = path.join(__dirname, 'views');

const nunjucksConfig = {
    autoescape: true,
    express: app,
    noCache:true
};

nunjucks.configure(appViews, nunjucksConfig);

app.set('view engine', 'html');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

app.get('/', (req, res) => {
    res.render('empty')

});
