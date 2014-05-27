jQuery(function($) {
			var template = ['<label class="tasks-list-item">',  
		        '<img id="<UPID>" class="tasks-list-mark up" src="img/up_disabled.png" />',
		        '<img id="<DOWNID>" class="tasks-list-mark down" src="img/down_disabled.png" />',
		        '<span class="tasks-list-desc"><NAME></span>',
		      	'</label>'].join('');
		     var socket = io.connect();

			function createHandler(img,vote,id) {
				return function handler(evt) {
					var $el = $(evt.target);
					$.post("/vote", {id: id, vote: vote}); 
					if (!$el.hasClass("checked")) {
						$el.addClass('checked');
						$el.attr('src', img)
					}

				}
			}

			new gnMenu( document.getElementById( 'gn-menu' ) );


			//get the updated playlist 
			socket.on('updatePlaylist', function(data){
				alert("got socket");
				renderList(data);
			});


			//old ajax way
			/*(function worker() {
	             $.getJSON("/playlist",function(result){
	            	renderList(result);
	             });
	    		 setTimeout(worker, 1000);
			 })();*/


			
			
			

			function renderList(songs) {
				$('#songlist').html('');
				$.each(songs, function(i, song) {
					$(template.replace("<NAME>", song.SongName).replace("<UPID>","up"+song.SongID).replace("<DOWNID>","down"+song.SongID)).appendTo($('#songlist')).data("id",song.SongID);

					$("#up"+song.SongID).click(createHandler("img/up_enabled.png", 'u',song.SongID));
					$("#down"+song.SongID).click(createHandler("img/down_enabled.png", 'd',song.SongID));
					foo = $("#up"+song.SongID);
				});

				//$(".tasks-list-mark.up").click(createHandler("img/up_enabled.png", 'u',song.SongID));
				//$(".tasks-list-mark.down").click(createHandler("img/down_enabled.png", 'd',song.SongID));
			}
			
});