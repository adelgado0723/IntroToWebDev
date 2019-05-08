const express = require('express');

const app = express;
app.get('/', (req, res) => {
    res.end('Welcome to my site!');
});
app.get('/complement', (req, res) => {
    res.end('You look very nice today.');
});
app.listen(3000);
console.log('listening on http://localhost:3000');

// This code uses the http module instead of express:

// const http = require('http');
// // The callback function that createServer() takes
// // will run each time a user requests the site
// const server = http.createServer(function(req, res) {
//     console.log(`user visited ${req.url}`);
//     res.end('hello!');
// });

// server.listen(3000);
// console.log('listening on http://localhost:3000');
