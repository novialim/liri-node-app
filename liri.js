'use strict';
(function(){
	var keys = require('./keys');
	var Twitter = require('twitter');
	var Spotify = require('node-spotify-api');
	var request = require('request');
	var fs = require('fs');
 
	// Assigning keys to variable client
	var client = new Twitter(keys.twitterKeys);
	var spotify = new Spotify(keys.spotifyKeys);

	var action = process.argv[2];
	var input = process.argv[3];

	if(action!=="do-what-it-says"){
		init(action);
	}
	else{
		dowhat();
	}

	function init(action, input){
		// We will then create a switch-case statement (if-then would also work).
		// The switch-case will direct which function gets run.
		switch (action) {
		  case "my-tweets":
		    myTweets();
		    break;

		  case "spotify-this-song":
		    spotifyThis();
		    break;
			
		  case "movie-this":
		    movieThis(input)
		    break;

		  case "do-what-it-says":
		    dowhat();
		    break;

		  default:
		  	instructions();
			break;
		}
	}

	function instructions(){
		console.log("The Available Commands Are: ");
		console.log("* \`my-tweets\`");
		console.log("* \`spotify-this-song\`");
		console.log("* \`movie-this\`");
		console.log("* \`do-what-it-says\`"); 
	}

	function myTweets(){
		var params = {screen_name: 'booogeygirl',
		              count: '20'};

		client.get('statuses/user_timeline', params, function(error, tweets, response){
			// If the request was successful...
			if (!error && response.statusCode === 200) {
			  
			    for(var i=0;i<tweets.length;i++){
			      console.log(tweets[i].text);
			      console.log(tweets[i].created_at);
			      console.log(' ');

			      // var log = tweets[i].text+'\r\n'+tweets[i].created_at+'\r\n'+'\r\n';
			      // fs.appendFile("./log.txt", log, function(err) {
			      //   if(err) {
			      //   return console.log(err);
			      //   }
			      // });
			    }
			}
			else if (error){
				console.log(error);
			}		     
		});
	}


	function spotifyThis(){
		if(input==undefined){
			//* If no song is provided then your program will default to "The Sign" by Ace of Base.
			input = "The Sign Ace of Base";
		}		

			spotify.search({ type: 'track', query: input }, function(err, data) {
			  if (err) {
			    return console.log('Error occurred: ' + err);
			  }

			  else{
			 	   	var trackData = data.tracks.items;
				    trackData.forEach(function(song) {
				      console.log('Artist: ' + song.artists[0].name);
				      console.log('Song: ' + song.name);
				      console.log('Preview Link: ' + song.external_urls.spotify);
				      console.log('Album: ' + song.album.name);

				      console.log('\r\n');
				    });
			   }
			});
		
	}
	
	function movieThis(){
		if(input==undefined){
			// * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
			input = "Mr. Nobody.";
     		console.log('If you haven\'t watched "Mr. Nobody." then you should: <http://www.imdb.com/title/tt0485947/>\nIt\'s on Netflix!');    
		}		
		else{

			request('http://www.omdbapi.com/?t='+encodeURIComponent(input)+'&y=&plot=short&apikey=40e9cece', function (err, response, body) {
			  if (err) {
			    return console.log('Error occurred: ' + err);
			  }

			  else{

				var movies = JSON.parse(body);

				console.log("* Title of the movie: "+movies.Title);
				console.log("* Year the movie came out: "+movies.Year);
				console.log("* IMDB Rating of the movie: "+movies.imdbRating);
				console.log("* Country where the movie was produced: "+movies.Country);
				console.log("* Language of the movie: "+movies.Language);
				console.log("* Plot of the movie: "+movies.Plot);
				console.log("* Actors in the movie: "+movies.Actors);
				if(movies.tomatoURL!==undefined)
					console.log("* Rotten Tomatoes URL: "+movies.tomatoURL);
		
			    console.log('\r\n');
				    
			   }
			});
		}
	}

	function dowhat(){

		fs.readFile("random.txt", 'utf8', function(err,data){
			if(err){
				return console.log(err);
			}

			var ranAction = data;
			var array = ranAction.split(",");

			action = array[0].trim();
			input = array[1].trim();

			console.log("Do What It Says Content: "+action);

			init(action, input);			

		});
	}

	function appendFile(){
		fs.appendFile("log.txt", ", "+amt, function(err,data){
			if(err) return console.log(err);
			else{
				
				console.log("Log Saved!");

				// Do we need to log the output data or commands only?

			}
		});
	}

})();
