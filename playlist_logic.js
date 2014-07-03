module.exports.addSong = function addSong(song_data){
		if(!song_data){
			io.sockets.emit('updatePlaylist',false);
		}else{
			var isThere = false;
			console.log("added to array");
			for(i=0;i<playlist.length;i++){
				if(playlist[i].SongID == data.SongID){
					playlist[i].val++;
					isThere = true;
				}
			}
			if(!isThere){
				playlist.push(song_data);
				io.sockets.emit('updatePlaylist', playlist);
			}
		}
    };