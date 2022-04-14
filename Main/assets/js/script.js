
let baseURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="

//just a hard coded example to test.  eventually just becomes the movie title that is written into the iframe
let trailerTitle;

// Get all elements, traverse the DOM
var movieTitleEl = document.getElementById("movie-title");
var moviePlotEl = document.getElementById("movie-overview");
var trailerEl = document.getElementById("trailer");
var dataGenreEl = document.querySelector(".genre");
var movieContainer = document.getElementById("random-movie");
var welcomeScreenEl = document.querySelector(".container");



// /discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=150
let tmdbUrl = "https://api.themoviedb.org/3/discover/movie?api_key="
// let genreUrlNum;

//List of genre IDs
var action = "28";
var crime = "80";
var comedy = "35";
var drama = "18";
var fantasy = "14";
var horror = "27";
var mystery = "9648";
var romance = "10749";
var scifi = "878";
var thriller = "53";

//api Keys
let ytApiKey;
let tmdbApiKey;


// This calls the API, just update the url to have your key's name.  API KEY FOR MOVIE DATABASE
async function fetchKey() {
    const url = 'https://yorkieportunus.herokuapp.com/store/tmdb-p1'
    const response = await fetch(url);
    const key = await response.json();
    return key;
}
// Call this wherever you need your key.
fetchKey().then((key) => {
    tmdbApiKey = key.apiKey;
    console.log(tmdbApiKey);
    getTMDB();

});


// API keys for YouTuube API
// 'https://yorkieportunus.herokuapp.com/store/find-a-flick-utube' 
// 'https://yorkieportunus.herokuapp.com/store/find-a-flick'
    

// This calls the API, just update the url to have your key's name.
async function fetchKeyYouTube() {
    const url = 'https://yorkieportunus.herokuapp.com/store/find-a-flick'
    const response = await fetch(url);
    const key = await response.json();
    return key;
}


// SAME AS BELOW BUT FOR THE YOUTUBE API KEY
fetchKeyYouTube().then((key) => {
    ytApiKey = key.apiKey;
    console.log(ytApiKey);
    // getYoutubeClip();
});

// Sets the volume of the "Welcome Audio".
var audio = document.getElementById("welcome-audio");
audio.volume = 0.33;

// Gets the random movie along with title and overview
function getTMDB(genreUrlNum) {
    fetch(tmdbUrl +  tmdbApiKey + "&language=en-US&with_genres=" + genreUrlNum + "&sort_by=vote_average.desc&vote_count.gte=1000")
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        trailerTitle = data.results[0].title + " official trailer";
        newMovieTitle = data.results[0].title
        console.log(trailerTitle);
        getYoutubeClip(trailerTitle);
        var overview = data.results[0].overview 
        console.log(overview);
       
        movieTitleEl.textContent = newMovieTitle;
        moviePlotEl.textContent = overview



    })

    
}


dataGenreEl.addEventListener("click",function genreMovie (event) {
    event.preventDefault();
    if (event.target.matches("button")) {
        genreUrlNum = event.target.dataset.genre;
        getTMDB(genreUrlNum);
        console.log(genreUrlNum);
        welcomeScreenEl.setAttribute("class", "hide");
        movieContainer.removeAttribute("class");


    }


    
})

//GLOBAL VARIABLE FOR THE YTAPIKEY SO THAT WE CAN USE IT IN THE FUNCTION BELOW FOR THE SEARCH FUNCTION WITH THE YOUTUBE API
// var ytAPIKey= fetchKeyYouTube();
// console.log("Youtube fetch key is " + ytAPIKey);


//function to fetch YOUTUBE SEARCH RESULTSD FOR THE MOVIE TITLE THAT WE FEED INTO IT
function getYoutubeClip(trailerTitle){

    //HERE IS THE SEARCH THAT WE ARE PERFORMING THROUGH THE YOUTUBE API.  VARIABLES ASSIGNED TO EACH INSTANCE, 2 CONSTANTS ARE THE BASE URL AND THE YTAPI KEY.  THE ADDITIONAL STRING &key= IS TO MAKE THE BROWSER READ THE API KEY AFTER THE TITLE

  fetch(baseURL + trailerTitle + "&key=" + ytApiKey)

  .then(function(response) {
      return response.json();
  })
  .then(function(data){
      console.log(data);
      console.log(data.items)
      //parsing out and logging items from the API.  we are getting a specific item from the data object by parsing through the objects in Data. IN THIS INSTANCE TEH OBJECT WE ARE GETTING IS THE VIDEO ID FOR THE IFRAME PLAYER
      console.log(data.items[0].id.videoId)


      //assigning the video id that we parsed out to a global variable that way we can use it in the <iframe>
      let videoIdTrailer = data.items[0].id.videoId;
      console.log(videoIdTrailer);

      let youtubeClip = `
      <iframe id="ytplayer" type="text/html" width="640" height="360"
      src="https://www.youtube.com/embed/${videoIdTrailer}"
      frameborder="0"></iframe>`;
 
      trailerEl.innerHTML = youtubeClip;

  })
  .catch(function(err){
      console.log(err)
  })    
}


