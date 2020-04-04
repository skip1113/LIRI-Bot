require("dotenv").config();
var keys = require("./keys.js");
var spotify = require("node-spotify-api");
var fs = require("fs");
var op1 = process.argv[2];
var input1 = process.argv[3];
var inputAll = process.argv.slice(2).join(" ");
var moment = require("moment");
moment().format();
var axios = require("axios");
if(op1 == "concert-this") {
    bandinTown(input1);
}
if(op1 == "spotify-this-song") {
    spotifySong(inputAll);
}
if(op1 == "movie-this") {
    movieOutput(inputAll);
}
if(op1 == "do-what-it-says") {
    simonSays(inputAll);
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
function spotifySong(inputAll) {

}
