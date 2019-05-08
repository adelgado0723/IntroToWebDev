const express = require('express');
const path = require('path');

const complements = [
    'You like nice today',
    'That dress looks nice on you',
    'Have you been working out?',
    'You can do hard things',
    "You've gotten far in this course. You're really smart",
    "You're programming! How cool is that?",
    "I'm really proud of you",
    'You made this',
    "You've learned a lot of things, and that's pretty hard to do",
];

function getRandomComplement() {
    const randomIndex = Math.floor(Math.random() * complements.length);
    return complements[randomIndex];
}

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')).end();
});

app.get('/complement', (req, res) => {
    res.json({ complement: getRandomComplement() }).end();
});

app.use('/public', express.static('./public'));

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
