const express = require('express')

let app = express();

let port = 8080;

const router = require('./route');

app.use('/', router.rout);

app.listen(port, () => console.log(`app running on port ${port}`));

