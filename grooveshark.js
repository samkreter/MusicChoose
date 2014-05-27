var GS = require('grooveshark-streaming');
var request = require('request');


module.exports.search = function search(data,callback){

	GS.Tinysong.getSongInfo(data[0], data[1], function(err, songInfo) {
		if(songInfo.SongID){
		    GS.Grooveshark.getStreamingUrl(songInfo.SongID, function(err, streamUrl) {
		      	request(streamUrl, function (error, response, body) {
			  		if (!error && response.statusCode == 200) {
			    		songInfo.StreamUrl = streamUrl
		     			songInfo.val = 0;
		      			console.log(streamUrl);
		      			callback(songInfo);	
			 		}else{
			 			callback(false);
			 		}
				});
				
		    });
		}else{
			callback(false);
		}
	});
}

//'Love of My Life', 'Queen'
//data[0], data[1]