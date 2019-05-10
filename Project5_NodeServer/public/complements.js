document.querySelector('.request-complement').addEventListener('click', function() {
  console.log(document.querySelector('.request-complement'));
  fetch('/complement')
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      document.querySelector('.complement').innerHTML = data.complement;
    })
    .catch(function(err) {
      console.error(err);
    });
});
