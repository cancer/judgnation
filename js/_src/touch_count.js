(function( _ ){
	$(function(){
		var $wrapper = $('#wrapper');
		var $box_timer = $('#jsTimerContainer');
		var $btn_A = $('#jsSecureButtonA');
		var $btn_B = $('#jsSecureButtonB');
		var $secure_btns = $('#jsBtnContainer').find('.mod_btn');
		var timer = '';
		var default_count = $box_timer.text();

		$secure_btns.bind('touchstart', function(e){
			e.preventDefault();
			var count = default_count;
			timer = setInterval(function(){
				count--;
				if(count === 0){
					_endTimer();
					_changeColor(e.target);
				}
				$box_timer.html(count);
			}, 1000);
		});

		$secure_btns.bind('touchend', function(e){
			e.preventDefault();
			_endTimer();
		});

		function _endTimer(){
			clearInterval(timer);
			$box_timer.html(default_count);
		}

		function _changeColor(elm){
			var btn_color = elm.className.match(/btn_(.*?)$/);
			console.log(btn_color);
			$wrapper.css('background-color', RegExp.$1);
		}
	});
})( window._ );
