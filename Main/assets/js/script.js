
let baseURL = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="
let Title = "No Country For Old Men Official Trailer";

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

// This calls the API, just update the url to have your key's name.
async function fetchKeyYouTube() {
    const url = 'https://yorkieportunus.herokuapp.com/store/find-a-flick-utube'
    const response = await fetch(url);
    const key = await response.json();
    return key;
}
// Call this wherever you need your key.
fetchKeyYouTube().then((key) => {
    secretKey = key.apiKey;
    console.log(secretKey);
});

// Sets the volume of the "Welcome Audio".
var audio = document.getElementById("welcome-audio");
audio.volume = 0.33;

var ytAPIKey= fetchKeyYouTube();
console.log("Youtube fetch key is " + ytAPIKey);

//function to fetch
function getYoutubeClip(){
  fetch(baseURL + Title + apiKey)
  .then(function(response) {
      return response.json();
  })
  .then(function(data){
      console.log(data);
      console.log(data.items)
      //parsing out and logging items from the API.  we are getting a specific item from the data object by parsing through the objects in Data
      console.log(data.items[0].id.videoId)

      //assigning the video id that we parsed out to a global variable that way we can use it in the <iframe>
      let videoIdTrailer = data.items[0].id.videoId;
      console.log(videoIdTrailer);

      let youtubeClip = `
      <iframe id="ytplayer" type="text/html" width="640" height="360"
      src="https://www.youtube.com/embed/${videoIdTrailer}"
      frameborder="0"></iframe>`;
  
      document.getElementById("movieContainer").innerHTML = youtubeClip;
  })
  .catch(function(err){
      console.log(err)
  })    
}
