var GS = require('grooveshark-streaming');


module.exports.search = function search(data,callback){

GS.Tinysong.getSongInfo('Save Me', 'Shinedown', function(err, songInfo) {
	console.log(songInfo);
    GS.Grooveshark.getStreamingUrl(songInfo.SongID, function(err, streamUrl) {
      console.log(streamUrl);
      songInfo.StreamUrl = streamUrl
      songInfo.val = 0;
      callback(songInfo);
    });
  });
}

//'Love of My Life', 'Queen'