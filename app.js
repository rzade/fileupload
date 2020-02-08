var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const hbs = require('hbs');
app.set('view engine', 'hbs');

app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: false }));
app.use(express.static(__dirname + '/public'));

app.use(fileUpload());

var main = require('./router/main');
app.use('/', main);

var port = process.env.PORT || 1000;

var server = app.listen(port, function() {
  console.log('Server is ' + port);
});