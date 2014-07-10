
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.host = function(req, res){
	res.render('host');
};

exports.playlist = function(req, res){
	res.render('playlist');
}