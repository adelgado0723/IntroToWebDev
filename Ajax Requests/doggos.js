const DOG_URL = 'https://dog.ceo/api/breeds/image/random';
const BREED_LIST_URL = 'https://dog.ceo/api/breeds/list/all';
const doggos = document.querySelector('.doggos');
const addDoggoButton = document.querySelector('.add-doggo');
const controls = document.querySelector('.controls');
const breedList = [];
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
    for (let breed in breeds) {
      if (breeds[breed].length > 0) {
        breeds[breed].forEach(breed => {
          const name = breed + ' ' + type;
          const value = breed.type.toLowerCase() + '-' + breed.breed.toLowerCase();
          const breedOption = document.createElement('option');
          option.value = value;
          option.innerHTML = name;
          select.appendChild(breedOption);
        });
      } else {
        const option = document.createElement('option');
        option.value = breed.toLowerCase();
        option.innerHTML = breeds.breed;
        select.appendChild(option);
      }
    }
  });

console.log(breeds.length);
console.log(breeds['bulldog']);

console.log(breeds);
console.log(select);

function addDoggo() {
  const promise = fetch(DOG_URL);
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
