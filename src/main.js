const express = require('express');
const     app = express();
const  router = require('./router');
const    port = 80;
const    host = '0.0.0.0';

app.use('/', router);

app.listen(port, host);
console.log(`Running on http://${host}:${host}`);
