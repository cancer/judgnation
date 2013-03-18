(function( _ ){
	$(function(){
		var $wrapper = $('#wrapper');
		var $box_timer = $('#jsTimerContainer');
		var $btn_A = $('#jsSecureButtonA');
		var $btn_B = $('#jsSecureButtonB');
		var $secure_btns = $('#jsBtnContainer').find('.mod_btn');
		var default_count = $box_timer.attr('data-interval');
		var timer = '';
		var current_owner = '';
		var team_A_color = $btn_A.attr('data-color');
		var team_B_color = $btn_B.attr('data-color');
		var current_owner_class = 'current';

		_setCurrentTime($box_timer, default_count);

		$secure_btns.bind('touchstart', function(e){
			e.preventDefault();
			var count = default_count;
			var that = $(this);
			timer = setInterval(function(){
				count--;
				if(count === 0){
					_endTimer();
					_setOwnerStatus(that.attr('data-color'));
				}
				_setCurrentTime($box_timer, count);
			}, 1000);
		});

		$secure_btns.bind('touchend', function(e){
			e.preventDefault();
			_endTimer();
		});

		function _setCurrentTime(elem, count) {
			elem.html(count);
		}

		function _endTimer(){
			clearInterval(timer);
			_setCurrentTime($box_timer, default_count);
		}

		// 画面を所有者の色に切り替える
		// @param team_AorB_color {String} チームの色
		function _setOwnerStatus(team_AorB_color) {
			var current_color;
			if (team_AorB_color === team_A_color) {
				current_color = team_A_color;
				$btn_A.addClass(current_owner_class);
				$btn_B.removeClass(current_owner_class);
			}
			if (team_AorB_color === team_B_color) {
				current_color = team_B_color;
				$btn_A.removeClass(current_owner_class);
				$btn_B.addClass(current_owner_class);
			}
			_changeColor(team_B_color);
		}

		function _changeColor(btn_color){
			$wrapper.css('background-color', btn_color);
		}
	});
})( window._ );
