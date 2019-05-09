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

const insults = [
    'Your breath smells like armpit!',
    'That shirt looks really bad on you.',
    'You look fat today.',
    "You can't do it. Give up.",
    "You've gotten far in this course. What a waste of time!",
    "You're programming! That stinks, go outside!",
    "I'm really disappointed with you",
    "You stole this code from the professor. You didn't make this",
    "You've learned nothing, and struggled doing so!",
];

function getRandomInsult() {
    const randomIndex = Math.floor(Math.random() * insults.length);
    return insults[randomIndex];
}
function getRandomComplement() {
    const randomIndex = Math.floor(Math.random() * complements.length);
    return complements[randomIndex];
}

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/complement', (req, res) => {
    res.json({ complement: getRandomComplement() }).end();
});

app.get('/insult', (req, res) => {
    res.json({ insult: getRandomInsult() }).end();
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
