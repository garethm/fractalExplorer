'use strict';

var
    express = require('express'),
    app = express();

var
    port = 8080;

app.use(express.static('public'));

app.listen(port);
console.log('Listening on port ' + port);