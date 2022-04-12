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
          // This calls the API, just update the url to have your key's name.
          async function fetchKey() {
            const url = 'https://yorkieportunus.herokuapp.com/store/tmdb-p1'
            const response = await fetch(url);
            const key = await response.json();
            return key;
        }
        // Call this wherever you need your key.
        fetchKey().then((key) => {
            secretKey = key.apiKey;
            console.log(secretKey);
        });
      
        
    