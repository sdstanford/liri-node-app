//Require packages
require("dotenv").config();
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var fs = require("fs");
var request = require("request");

//Require Keys
var keys = require("./keys.js")

// Store first entry as command type
var commandType = process.argv[2];

// Store second entry as command
var command = process.argv[3];

//BEGIN MY-TWEETS SEARCH

if (commandType === "my-tweets") {

  //Link to twitter keys
  var client = new Twitter(keys.twitter);
  
  //Set params and perform search
  var params = {screen_name: 'ShannonStanfor8'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {

    //If no error console log tweets
    if (!error) {
      console.log(tweets)
    }
  });

}

//BEGIN SPOTIFY SEARCH
else if (commandType === "spotify-this-song") {

  //Link to Spotify keys
  var spotify = new Spotify(keys.Spotify);

  //Perform Spotify search
  spotify.search({ type: 'track', query: command }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  //Console log data
  console.log(data); 
  });
  
}

//BEGIN MOVIE-THIS SEARCH
else if (commandType === "movie-this") {

  //Create MovieSearch object
  var MovieSearch = function(movieName) {
    this.movieName = movieName
    this.queryUrl = "http://www.omdbapi.com/?t=" + this.movieName + "&y=&plot=short&apikey=trilogy";
    this.search = function() {
      request(this.queryUrl, function(error, response, body) {
  
        // If the request is successful
        if (!error && response.statusCode === 200) {
      
          // Parse the body of the site and recover the movie info
          console.log(
            "Title: " + JSON.parse(body).Title,
            "\nYear: " + JSON.parse(body).Year,
            "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value,
            "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value,
            "\nCountry: " + JSON.parse(body).Country,
            "\nLanguage: " + JSON.parse(body).Language,
            "\nPlot: " + JSON.parse(body).Plot,
            "\nActors: " + JSON.parse(body).Actors,
          );
        }
      });
    }
  }
  var newMovieSearch = new MovieSearch(command);
  newMovieSearch.search();
}

//BEGIN DO-WHAT-IT-SAYS
else if (commandType === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
  
    // Then split it by commas
    var dataArr = data.split(",");
  
    //Set as new variables
    var commandType = dataArr[0];
    var command = dataArr[1];

    
    if (commandType === "my-tweets") {

      //Link to twitter keys
      var client = new Twitter(keys.twitter);
      
      //Set params and perform search
      var params = {screen_name: 'ShannonStanfor8'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
    
        //If no error console log tweets
        if (!error) {
          console.log(tweets)
        }
      });
    
    }
    
    //BEGIN SPOTIFY SEARCH
    else if (commandType === "spotify-this-song") {
    
      //Link to Spotify keys
      var spotify = new Spotify(keys.Spotify);
    
      //Perform Spotify search
      spotify.search({ type: 'track', query: command }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      //Console log data
      console.log(data); 
      });
      
    }
    
    //BEGIN MOVIE-THIS SEARCH
    else if (commandType === "movie-this") {
    
      //Create MovieSearch object
      var MovieSearch = function(movieName) {
        this.movieName = movieName
        this.queryUrl = "http://www.omdbapi.com/?t=" + this.movieName + "&y=&plot=short&apikey=trilogy";
        this.search = function() {
          request(this.queryUrl, function(error, response, body) {
      
            // If the request is successful
            if (!error && response.statusCode === 200) {
          
              // Parse the body of the site and recover the movie info
              console.log(
                "Title: " + JSON.parse(body).Title,
                "\nYear: " + JSON.parse(body).Year,
                "\nIMDB Rating: " + JSON.parse(body).Ratings[0].Value,
                "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value,
                "\nCountry: " + JSON.parse(body).Country,
                "\nLanguage: " + JSON.parse(body).Language,
                "\nPlot: " + JSON.parse(body).Plot,
                "\nActors: " + JSON.parse(body).Actors,
              );
            }
          });
        }
      }
      var newMovieSearch = new MovieSearch(command);
      newMovieSearch.search();
    }

})
}