# LIRI-Bot

# Link to deployed app: https://github.com/skip1113/Liri-node-app

## Overview
This LIRI app is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data that you input.
In this case when you type in ther terminal Ex: "node liri.js concert-this metallica" the app installed with axios will get data from a api, in this case Bands in town. Instead of having this infomation put on a browser, node will log the information into the terminal.
### Command Lines
These are the command lines that will return data back to the user.
* node liri.js concert-this
* node liri.js spotify-this-song
* node liri.js movie-this
* node liri.js do-what-it-says
### Instructions
* Clone this repository and open the files terminal.
* Type in the command: "npm install" This will install packages that this app has used from the package.json file.
* Now that the packages are installed, run the following command lines in the terminal and the following information will be output to the terminal.
### Outcome for each command line:
* node liri.js concert-this <artist/band name>
    * Name of venue
    * Venue location
    * Date of the event in MM/DD/YYYY format


    ![](/images/concert2.png)
* node liri.js spotify-this-song <song/track name>
    * Artist
    * Song
    * Spotify song preview url
    * Album

    ![](/images/spotify2.png)
* node liri.js movie-this <movie title>
    * Title of the movie
    * Year the movie came out
    * IMDB Rating of the movie
    * Country where the movie was produced
    * Language of the movie
    * Plot of the movie
    * Actors in the movie
    * Rotten Tomatoes Rating of the movie

    ![](/images/movie2.png)

* node liri.js do-what-it-says
    * This will print the information from the random.txt file.

    ![](/images/do-what.png)

## Organization:
* This app started with installing node packages.
    * npm init - package.json file
    * Axios, Spotify, Moment, and others.
* Creating files 
    * Main .js file for command inputs to retreive data.
    * .env file to hold our spotify key which is hidden, and a file to export the key to the main Node file.
    * Package.json file that holds various node packages, and metadata relevant to this project.
* Requiring the node packages, and the exported spotify key.
* if statements that take in the argument in the command line that users input.

## Technologies used:
* Javascript
* Nodejs
* API's:
    * Bands in town 
    * OMDB
* Node Packages:
    * Node-Spotify-API
    * Axios
    * Moment
    * DotEnv
