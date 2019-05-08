const DOG_URL = 'https://dog.ceo/api/breeds/image/random';
const BREED_LIST_URL = 'https://dog.ceo/api/breeds/list/all';
const doggos = document.querySelector('.doggos');
const addDoggoButton = document.querySelector('.add-doggo');
const controls = document.querySelector('.controls');
let breeds = [];

const select = document.createElement('select');
const option = document.createElement('option');
option.value = 'any-breed';
option.innerHTML = 'Any Breed';
select.appendChild(option);
controls.appendChild(select);

// Request list of dog breeds
const breedListPromise = fetch(BREED_LIST_URL);
breedListPromise
    .then(response => {
        // "then" waits for the response before proceeding
        // A promise is returned from the .json() function
        // because it can take some time to parse the JSON
        const processingPromise = response.json();
        return processingPromise;
    })
    .then(processedResponse => {
        // Second then is to wait on the JSON parsing
        breeds = processedResponse.message;
        // console.log(breeds);
        const properties = Object.keys(breeds);
        const breedList = [];

        properties.forEach(property => {
            const varieties = breeds[property];
            const varietyKeys = Object.keys(varieties);
            const numVarieties = varietyKeys.length;
            let name = '';
            let value = '';

            if (numVarieties > 0) {
                varieties.forEach(variety => {
                    name = `${variety} ${property}`;
                    value = `${property}-${variety}`;
                    breedList.push({ name, value });
                });
            } else {
                name = property;
                value = property;
                breedList.push({ name, value });
            }
        });
        breedList.forEach(dog => {
            const varietyOption = document.createElement('option');
            varietyOption.value = dog.value;
            varietyOption.innerHTML = dog.name;
            select.appendChild(varietyOption);
        });
    });

function addDoggo() {
    let promise;
    const selection = select.options[select.selectedIndex].value;
    if (selection === 'any-breed') {
        promise = fetch(DOG_URL);
    } else {
        promise = fetch(`https://dog.ceo/api/breed/${selection}/images/random`);
    }
    promise
        .then(response => {
            // "then" waits for the response before proceeding

            // A promise is returned from the .json() function
            // because it can take some time to parse the JSON
            const processingPromise = response.json();
            return processingPromise;
        })
        .then(processedResponse => {
            // Second then is to wait on the JSON parsing
            console.log(processedResponse);
            const img = document.createElement('img');
            img.src = processedResponse.message;
            img.alt = 'Cute doggos';
            doggos.appendChild(img);
        });
}
console.log('This will log first while the AJAX request is being made');
addDoggoButton.addEventListener('click', addDoggo);
