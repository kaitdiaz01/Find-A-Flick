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