var express = require('express');
var app = express();

var path = require('path');

app.get('/', function(req, res) {
    res.send('No much here... load owa.html as a file in your browser.');
});

app.post('/verify_persona_assertion', function(req, res) {
  console.log('verify_persona_assertion');
  res.send(JSON.stringify({
    status: "okay",
    email: "foo@bar.com"
  }))
});

console.log('mapping', path.join(__dirname));
app.use('/', express.static(path.join(__dirname)));

app.listen(6660);