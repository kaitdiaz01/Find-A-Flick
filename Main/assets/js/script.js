//test API

function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://api.themoviedb.org/3/movie/550?api_key=821ac2213e8e35805cb8bcd84865bc4c';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
    }

    getApi();