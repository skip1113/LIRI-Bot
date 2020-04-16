// Require spotify key from keys.js file
require('dotenv').config();
const Spotify = require('node-spotify-api');
const fs = require('fs');
const moment = require('moment');
const axios = require('axios');

const op1 = process.argv[2];
const input1 = process.argv[3];

const keys = require('./keys.js');
const inputAll = process.argv.slice(3).join(' ');

moment().format();
// var defaultSong = 'the sign';
// Taking arguments to run each function

// Bandsintown search
function bandinTown(town) {
    axios.get(`https://rest.bandsintown.com/artists/${town}/events?app_id=codingbootcamp`).then((response) => {
        // console.log(response.data);
        // console.log('Name of Venue ' + response.data.venue.name);
        const { data } = response;
        for (let i = 0; i < data.length; i++) {
            const results = data[i];
            const { name, city } = results.venue;
            const date = results.datetime;
            console.log(`Name of Venue ${name}`);
            console.log(`The Venue's location ${city}`);
            console.log(`Date of Event ${moment(date).format('MM/DD/YYYY')}`);
        }
    }).catch((error) => {
        console.log(error);
    });
}
// Node spotify search
function spotifySong(songName) {
    const spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET,
    });

    spotify.search({ type: 'track', limit: 1, query: songName }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            data.tracks.items.forEach((item) => {
                console.log(`Song Name: ${item.name}`);
                console.log(`Preview link of the song from spotify: ${item.href}`);
                console.log(`Artist: ${item.artists[0].name}`);
                console.log(`The album that the song is from: ${item.album.name}`);
            });
        }
    });
}

// Default song
function defaultSong() {
    const spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET,
    });

    spotify.search({ type: 'track', limit: 1, query: 'the sign' }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            data.tracks.items.forEach((item) => {
                console.log(`Song Name: ${item.name}`);
                console.log(`Preview link of the song from spotify: ${item.href}`);
                console.log(`Artist: ${item.artists[0].name}`);
                console.log(`The album that the song is from: ${item.album.name}`);
            });
        }
    });
}
// Axios function to search for movies
function movieOutput(movie) {
    const queryUrl = `http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`;
    axios.get(queryUrl).then((response) => {
        const { data } = response;
        //   console.log(response.data);
        console.log(`Movie title: ${data.Title}`);
        console.log(`Year the movie came out: ${data.Year}`);
        console.log(`IMDB Rating: ${data.imdbRating}`);
        console.log(`Rotten Tomatoes rating: ${data.Ratings[1].Value}`);
        console.log(`Country The Movie was produced: ${data.Country}`);
        console.log(`Language of the movie: ${data.Language}`);
        console.log(`Plot of the movie: ${data.Plot}`);
        console.log(`Actors: ${data.Actors}`);
    }).catch((error) => {
        if (error.response) {
            console.log('---------------Data---------------');
            console.log(error.response.data);
        }
    });
}
// Default movie to Mr.Nobody
function defaultMovie() {
    const queryUrl = 'http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy';
    axios.get(queryUrl).then((response) => {
        console.log('If you haven\'t watched Mr. Nobody');
        console.log('Then you should: http://www.imdb.com/title/tt0485947/');
        console.log('It\'s on Netflix! Here\'s the info!');
        console.log(`Year the movie came out: ${response.data.Year}`);
        console.log(`IMDB Rating: ${response.data.imdbRating}`);
        console.log(`Rotten Tomatoes rating: ${response.data.Ratings[1].Value}`);
        console.log(`Country The Movie was produced: ${response.data.Country}`);
        console.log(`Language of the movie: ${response.data.Language}`);
        console.log(`Plot of the movie: ${response.data.Plot}`);
        console.log(`Actors: ${response.data.Actors}`);
    }).catch((error) => {
        if (error.response) {
            console.log('---------------Data---------------');
            console.log(error.response.data);
        }
    });
}
// Simon says, reading another file to print to terminal.
function simonSays() {
    fs.readFile('random.txt', 'utf8', (error, data) => {
        if (error) {
            console.log(error);
        } else {
            const dataArry = data.split(',');
            console.log(dataArry);
        }
    });
}

switch (op1) {
    case 'concert-this':
        bandinTown(input1);
        break;
    case 'do-what-it-says':
        simonSays();
        break;
    case 'movie-this':
        if (input1 != null) {
            movieOutput(input1);
        } else {
            defaultMovie();
        }
        break;
    case 'spotify-this-song':
        if (input1 != null) {
            spotifySong(input1);
        } else {
            defaultSong();
        }
        break;

    default:
        break;
}
