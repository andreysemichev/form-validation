const express = require('express');
const createError = require('http-errors');
const path = require('path');
const formidableMiddleware = require('express-formidable');
const PORT = require('dotenv').config().parsed.GOODS_LIST_PORT || 3000;

const app = express();

// require('./mocks')();

app.use(formidableMiddleware({
    encoding: 'utf-8',
    multiples: true
}));

const hbs = require('express-handlebars').create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: require('./helpers')
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use('/public', express.static(path.join(__dirname, 'public')));

const routes = require('./routes');
app.use('/', routes);

app.use((req, res, next) => {
    next(createError(404, 'Страница не найдена'));
});

app.use((err, req, res, next) => {
    let locals = res.locals;

    locals.head = {
        title: 'Ошибка ' + err.status || 500,
    };
    locals.info = {
        status: err.status || 500,
        message: err.message || 'Внутренняя ошибка сервера.',
        text: 'Приносим извинения за неудобства. Вы можете перейти на <a href="/">Главную</a>',
    };
  
    res.render('error');
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
