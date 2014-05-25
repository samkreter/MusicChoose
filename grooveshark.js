var GS = require('grooveshark-streaming');


module.exports.search = function search(data,callback){

GS.Tinysong.getSongInfo(data[0], data[1], function(err, songInfo) {
    GS.Grooveshark.getStreamingUrl(songInfo.SongID, function(err, streamUrl) {
      songInfo.StreamUrl = streamUrl
      songInfo.val = 0;
      console.log(streamUrl);
      callback(songInfo);
    });
  });
}

//'Love of My Life', 'Queen'
//data[0], data[1]