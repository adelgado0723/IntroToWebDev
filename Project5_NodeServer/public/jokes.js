document.querySelector('.request-joke').addEventListener('click', function() {
  fetch('/joke')
    .then(function(res) {
      console.log(res);
      return res.json();
    })
    .then(function(data) {
      document.querySelector('.joke').innerText = data.joke;
    })
    .catch(function(err) {
      console.error(err);
    });
});
