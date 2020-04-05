require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var op1 = process.argv[2];
var input1 = process.argv[3];
var inputAll = process.argv.slice(3).join(" ");
var moment = require("moment");
moment().format();
var axios = require("axios");
if(op1 == "concert-this") {
    bandinTown(input1);
}
if(op1 == "spotify-this-song") {
    spotifySong(input1);
}
if(op1 == "movie-this") {
    movieOutput(input1);
}
if(op1 == "do-what-it-says") {
    simonSays();
}
function bandinTown(input1) {
    axios.get("https://rest.bandsintown.com/artists/" + input1 + "/events?app_id=codingbootcamp").then(
        function(response) {
            // console.log(response.data);
            // console.log("Name of Venue " + response.data.venue.name);
            var responseArray = response.data;
            for (var i = 0; i < 1; i++){
                var results = responseArray[i];
                var venue = results.venue;
                // console.log(venue);
                var venName = venue.name;
                var venCity = venue.city;
                var date = results.datetime;
                console.log("Name of Venue " + venName);
                console.log("The Venue's location " + venCity);
                console.log("Date of Event " + moment(date).format('MM/DD/YYYY'));
            }
        })
        .catch(function(error) {
        })
}
function spotifySong(input1) {
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET});

    spotify.search({ type: "track", limit: 1, query: input1}, function (err, data) {
        
        if (err) {
            return console.log(err);
        }
        console.log(JSON.stringify(data, null, 2));
        var artist = data.tracks.items[0].artists;
        var song = data.tracks.items[0].name;
        var link = data.tracks.items[0].href;
        // var album = data.tracks.album.name;
        data.tracks.items.forEach(function(track, index) {
            ;
          
            console.log("Song Name: " + song);
            console.log("Preview link of the song from spotify " + link);
            console.log("Artists " + track.artists[0].name);
            console.log("The album that the song is from " + track.album.name);
        });
    });
};
function movieOutput(input1) {
    var queryUrl = "http://www.omdbapi.com/?t=" + input1 + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
          console.log("Release Year: " + response.data.Title);
          console.log("Movie title " + response.data.Title);
          console.log("Year the movie came out " + response.data.Year);
          console.log("Rating: " + response.data.imdbRating);
          console.log("Language of the movie: " + response.data.Language);
          console.log("Plot of the movie " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
        })
        .catch(function(error) {
            if (error.response) {
              
              console.log("---------------Data---------------");
              console.log(error.response.data);
             
            }
        })
}
function simonSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error) {
            return console.log(error);
        }
        var dataArry = data.split(",");
        console.log(dataArry);
    })
}
