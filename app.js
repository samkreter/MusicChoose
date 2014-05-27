
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var grooveshark = require('./grooveshark');


//set up sockets
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


//app varibles
var playlist = [];


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



app.post('/add', function(req,res){
    var data = req.body.search.split(", ");
    console.log(data);
	grooveshark.search(data,function(data){
		
		var isThere = false;
		console.log("added to array");
		for(i=0;i<playlist.length;i++){
			if(playlist[i].SongID == data.SongID){
				playlist[i].val++;
				isThere = true;
			}
		}
		if(!isThere){
			playlist.push(data);
			io.sockets.emit('updatePlaylist', playlist);
		}
    });
});

app.post('/vote',function(req,res){



	for(i=0;i<playlist.length;i++){
		if(playlist[i].SongID == req.body.id){
			if(req.body.vote == 'd'){
				playlist[i].val--;

			}
			if(req.body.vote == 'u'){
				playlist[i].val++;
			}
		}
	}
	
	playlist.sort(function(a, b){
	    return b.val - a.val;
    });

	io.sockets.emit('updatePlaylist', playlist);

    for(i=0;i<playlist.length;i++){
		console.log(playlist[i].SongName+" "+playlist[i].val);
	}
});

app.get('/host',function(req,res){
	res.send(host.html)
});

app.get('/playlist',function(req,res){
	res.send(playlist);
});

app.get('/play',function(req,res){
	res.send(playlist.shift());
});


io.sockets.on('connection',function(socket){

	io.sockets.emit('updatePlaylist', playlist);

});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
