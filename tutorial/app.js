const http = require('http');
const users = require('../hw2/hw2_1/users.json')

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(users));
});

const PORT = 3000;

server.listen(PORT, 'localhost', (err) => {
    err ? console.error(err) : console.log(`listening port ${PORT}`);
});