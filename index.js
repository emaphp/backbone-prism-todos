//dependencies
var express = require('express');
var handlebars = require('express-handlebars');

//create app
var app = express();
app.set('port', (process.env.PORT || 5000));

//setup handlebars
app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');

//static content
app.use(express.static(__dirname + '/public'));

//environment middleware
app.use(function(req, res, next) {
    var uaid = process.env.SITE_ID;
    if (!uaid) {
        res.locals.includeAnalitycs = false;
        return next();
    }

    res.locals.includeAnalitycs = (app.get('env') || 'development') === 'production';
    res.locals.uaid = uaid;
    next();
});

//main route
app.get('/', function(req, res) {
	res.render('index', {layout: false});
});

//404
app.use(function(req, res, next) {
	res.render('404', {layout: false});
});

//ready and serve
app.listen(app.get('port'));
