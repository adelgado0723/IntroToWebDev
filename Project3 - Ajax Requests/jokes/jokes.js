const JOKE_URL = 'https://icanhazdadjoke.com/';
const jokes = document.querySelector('.jokes');
const addJokeButton = document.querySelector('.add-joke');
const controls = document.querySelector('.controls');
let isFirstJoke = true;

function addJoke() {
    const promise = fetch(JOKE_URL, {
        headers: {
            Accept: 'application/json',
        },
    });
    promise
        .then(response => {
            // "then" waits for the response before proceeding

            // A promise is returned from the .json() function
            // because it can take some time to parse the JSON
            const processingPromise = response.json();

            // const processingPromise = response;
            console.log(processingPromise);
            return processingPromise;
        })
        .then(processedResponse => {
            // Second then is to wait on the JSON parsing
            console.log(processedResponse);
            if (isFirstJoke) {
                jokes.classList.add('display');
                isFirstJoke = false;
            }
            const li = document.createElement('li');
            li.innerHTML = processedResponse.joke;
            li.classList.add('joke-text');
            jokes.appendChild(li);
        });
}
console.log('This will log first while the AJAX request is being made');
addJokeButton.addEventListener('click', addJoke);
