module.exports.addSong = function addSong(song_data,playlist,callback){
		if(!song_data){
			callback(false);
		}else{
			var isThere = false;
			console.log("added to array");
			for(i=0;i<playlist.length;i++){
				if(playlist[i].SongID == song_data.SongID){
					playlist[i].val++;
					isThere = true;
				}
			}
			if(!isThere){
				playlist.push(song_data);
				callback(playlist);
			}
		}
    };