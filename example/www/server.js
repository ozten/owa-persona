var express = require('express');
var app = express();

var path = require('path');

app.get('/', function(req, res) {
    res.send('No much here... load owa.html as a file in your browser.');
});

app.post('/persona_assertion', function(req, res) {

});

console.log('mapping', path.join(__dirname));
app.use('/', express.static(path.join(__dirname)));

app.listen(6660);