
let baseURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="
//just a hard coded example to test.  eventually just becomes the movie title that is written into the iframe
let Title = "No Country For Old Men Official Trailer";

let tmdbUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key="
//List of genre IDs
var action = 28;
var crime = 80;
var comedy = 






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

// This calls the API, just update the url to have your key's name.
async function fetchKeyYouTube() {
    const url = 'https://yorkieportunus.herokuapp.com/store/find-a-flick-utube'
    const response = await fetch(url);
    const key = await response.json();
    return key;
}


// SAME AS BELOW BUT FOR THE YOUTUBE API KEY
fetchKeyYouTube().then((key) => {
    ytApiKey = key.apiKey;
    console.log(ytApiKey);
    getYoutubeClip();
});

// Sets the volume of the "Welcome Audio".
var audio = document.getElementById("welcome-audio");
audio.volume = 0.33;


function getTMDB() {
    fetch(tmdbUrl + tmdbApiKey)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        
    })

    
}







//GLOBAL VARIABLE FOR THE YTAPIKEY SO THAT WE CAN USE IT IN THE FUNCTION BELOW FOR THE SEARCH FUNCTION WITH THE YOUTUBE API
var ytAPIKey= fetchKeyYouTube();
console.log("Youtube fetch key is " + ytAPIKey);


//function to fetch YOUTUBE SEARCH RESULTSD FOR THE MOVIE TITLE THAT WE FEED INTO IT
function getYoutubeClip(){

    //HERE IS THE SEARCH THAT WE ARE PERFORMING THROUGH THE YOUTUBE API.  VARIABLES ASSIGNED TO EACH INSTANCE, 2 CONSTANTS ARE THE BASE URL AND THE YTAPI KEY.  THE ADDITIONAL STRING &key= IS TO MAKE THE BROWSER READ THE API KEY AFTER THE TITLE

  fetch(baseURL + Title + "&key=" + ytApiKey)

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
 
    //   document.getElementById("movieContainer").innerHTML = youtubeClip;

  })
  .catch(function(err){
      console.log(err)
  })    
}
