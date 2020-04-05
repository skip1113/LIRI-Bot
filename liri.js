//Require spotify key from keys.js file
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
// var defaultSong = "the sign";
//Taking arguments to run each function
if(op1 == "concert-this") {
    bandinTown(input1);
}

if(op1 == "movie-this" && input1) {
    movieOutput(input1);
}
if(op1 == "movie-this" && input1 == undefined) {
    defaultMovie();
}
if(op1 == "do-what-it-says") {
    simonSays();
}

// else{
//     defaultSong();
// }
//Or Another way for default song
if(op1 == "spotify-this-song" && input1 == undefined) {
    // console.log(input1);
    defaultSong();
}
if(op1 == "spotify-this-song" && input1) {
    spotifySong(input1);
}

//Bandsintown search
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
//Node spotify search
function spotifySong(input1) {
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET});

    spotify.search({ type: "track", limit: 1, query: input1}, function (err, data) {
        
        if (err) {
            return console.log(err);
        }
        // console.log(JSON.stringify(data, null, 2));
        var artist = data.tracks.items[0].artists;
        var song = data.tracks.items[0].name;
        var link = data.tracks.items[0].href;
        // var album = data.tracks.album.name;
        data.tracks.items.forEach(function(track, index) {
            ;
          
            console.log("Song Name: " + song);
            console.log("Preview link of the song from spotify: " + link);
            console.log("Artist: " + track.artists[0].name);
            console.log("The album that the song is from: " + track.album.name);
        });
    });
};
//Default song 
function defaultSong() {
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET});

    spotify.search({ type: "track", limit: 1, query: "the sign"}, function (err, data) {
        
        if (err) {
            return console.log(err);
        }
        // console.log(JSON.stringify(data, null, 2));
        var artist = data.tracks.items[0].artists;
        var song = data.tracks.items[0].name;
        var link = data.tracks.items[0].href;
        // var album = data.tracks.album.name;
        data.tracks.items.forEach(function(track, index) {
            ;
          
            console.log("Song Name: " + song);
            console.log("Preview link of the song from spotify: " + link);
            console.log("Artist: " + track.artists[0].name);
            console.log("The album that the song is from: " + track.album.name);
        });
    });
};
//Axios function to search for movies
function movieOutput(input1) {
    var queryUrl = "http://www.omdbapi.com/?t=" + input1 + "&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
        //   console.log(response.data);
          console.log("Movie title: " + response.data.Title);
          console.log("Year the movie came out: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
          console.log("Country The Movie was produced: " + response.data.Country);
          console.log("Language of the movie: " + response.data.Language);
          console.log("Plot of the movie: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
        })
        .catch(function(error) {
            if (error.response) {
              
              console.log("---------------Data---------------");
              console.log(error.response.data);
             
            }
        })
}
//Default movie to Mr.Nobody
function defaultMovie() {
    var queryUrl = "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy";
    axios.get(queryUrl).then(
        function(response) {
          
          console.log("If you haven't watched Mr. Nobody");
          console.log("Then you should: http://www.imdb.com/title/tt0485947/");
          console.log("It's on Netflix! Here's the info! ");
          console.log("Year the movie came out: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
          console.log("Country The Movie was produced: " + response.data.Country);
          console.log("Language of the movie: " + response.data.Language);
          console.log("Plot of the movie: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
        })
        .catch(function(error) {
            if (error.response) {
              
              console.log("---------------Data---------------");
              console.log(error.response.data);
             
            }
        })
}
//Simon says, reading another file to print to terminal.
function simonSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error) {
            return console.log(error);
        }
        var dataArry = data.split(",");
        console.log(dataArry);
    })
}
