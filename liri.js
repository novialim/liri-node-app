'use strict';
(function(){
	var keys = require('./keys');

	// Assigning keys to variable client for twitter use
	var client = new Twitter(keys);

	var op = process.argv[2];
	var input = process.argv[3];

	if (op == "my-tweets"){
		myTweets();
	}
	else if(op == "spotify-this-song"){
		spotify(input);
	}
	else if(op == "movie-this"){
		movieThis(input)
	}
	else if(op == "do-what-it-says"){

	}
	else{
		console.log("The Available Commands Are: ");
		console.log("* \`my-tweets\`");
		console.log("* \`spotify-this-song\`");
		console.log("* \`movie-this\`");
		console.log("* \`do-what-it-says\`");
	}

	
})();
