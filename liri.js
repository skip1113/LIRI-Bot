requestAnimationFrame("dotenv").config();
var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);
var song = process.argv[2];
var artist = process.argv[3];

var axios = require("axios");

axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function(response) {
        console.log("Name of the venue ");
    })
    .catch(function(error) {

    })

