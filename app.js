
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var grooveshark = require('./grooveshark');



var app = express();

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

//yea sorry global 
var playlist = [];


// function cleanPlaylist(){
// 	for(i=0;i<playlist.length;i++){
// 		if
// 	}
// }

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
		}
    });
});

app.post('/vote',function(req,res){



	for(i=0;i<playlist.length;i++){
		console.log(playlist[i].SongID);
		if(playlist[i].SongID == req.body.id){
			if(req.body.vote == 'd'){
				playlist[i].val--;
			}
			if(req.body.vote == 'u'){
				playlist[i].val++;
			}
		}
	}
	for(i=0;i<playlist.length;i++){
		console.log(playlist[i].SongName);
	}
	playlist.sort(function(a, b){
	    if(a.SongID < b.SongID) return -1;
	    if(a.SongID > b.SongID) return 1;
	    return 0;
    });
    for(i=0;i<playlist.length;i++){
		console.log(playlist[i].SongName);
	}
});


app.get('/playlist',function(req,res){
	res.send(playlist);
});



app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
