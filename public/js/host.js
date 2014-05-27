jQuery(function($) {

			var template = ['<video id="player" width="320" height="240" controls autoplay>',
				             '<source src="<SOURCE>">',
			                 '</video>'].join(' ');

		(function loadVid(){
			 $('#VideoDiv').html(' ');
				$.getJSON("/play",function(result){
		           $(template.replace("<SOURCE>",result.StreamUrl)).appendTo($('#VideoDiv'));
		           $('#player').bind("ended",function(){
		           	loadVid();
		 		});
		       });
			})();
			
				

			

			new gnMenu( document.getElementById( 'gn-menu' ) );
		});