var verify = require('browserid-verify')();
var express = require('express');
var path = require('path');

var app = express();
app.use(express.bodyParser());

app.get('/', function(req, res) {
    res.send('No much here... load owa.html as a file in your browser.');
});

app.post('/verify_persona_assertion', function(req, res) {
    var assertion = req.body.assertion;
    var audience = 'http://localhost:6660';
    verify(assertion, audience, function(err, email, response) {
        if (err) {
            // make sure no session is created
            console.log('ERROR: There was an error : ' + err);
        }
        res.send(JSON.stringify(response));
    });
});

app.use('/', express.static(path.join(__dirname)));

app.listen(6660);