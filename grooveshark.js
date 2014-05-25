var GS = require('grooveshark-streaming');


module.exports.search = function search(data,callback){

GS.Tinysong.getSongInfo('Love of My Life', 'Queen', function(err, songInfo) {
    GS.Grooveshark.getStreamingUrl(songInfo.SongID, function(err, streamUrl) {
      songInfo.StreamUrl = streamUrl
      songInfo.val = 0;
      callback(songInfo);
    });
  });
}

//'Love of My Life', 'Queen'