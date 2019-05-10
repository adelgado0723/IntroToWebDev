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

const jokes = [
    'Today at the bank, an old lady asked me to help check her balance. So I pushed her over.',
    'I told my girlfriend she drew her eyebrows too high. She seemed surprised.',
    'My dog used to chase people on a bike a lot. It got so bad, finally I had to take his bike away.',
    "I'm so good at sleeping. I can do it with my eyes closed.",
    'My boss told me to have a good day.. so I went home.',
    'Why is Peter Pan always flying? He neverlands.',
    'A woman walks into a library and asked if they had any books about paranoia. The librarian says "They\'re right behind you!"',
    "The other day, my wife asked me to pass her lipstick but I accidentally passed her a glue stick. She still isn't talking to me.",
    'When you look really closely, all mirrors look like eyeballs.',
    'My friend says to me: "What rhymes with orange" I said: "No it doesn\'t"',
    "I couldn't figure out why the baseball kept getting larger. Then it hit me.",
];

function getRandomJoke() {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
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

app.get('/joke', (req, res) => {
    res.json({ joke: getRandomJoke() }).end();
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
