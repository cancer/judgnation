(function( _ ){
	$(function(){
		var $container = $('#jsSettingContainer');
		var $set_timer_field = $('#jsSettingTimer');
		var $btn_save = $('#jsBtnSettingSave');
		var $btn_cancel = $('#jsBtnSettingCancel');
		var $box_timer = $('#jsTimerContainer');

		$btn_cancel.bind({
			'touchstart' : function(e){
				e.preventDefault();
			},
			'touchend' : function(e){
				e.preventDefault();
				$container.hide();
			}
		});

		$btn_save.bind({
			'touchstart' : function(e){
				e.preventDefault();
			},
			'touchend' : function(e){
				e.preventDefault();
				var set_timer_val = $set_timer_field.val();

				if(set_timer_val === ''){
					$container.hide();
					return ;
				}

				judgnation.save('timer', set_timer_val);
				_setCurrentTime($box_timer, set_timer_val);
				$container.hide();
				return ;
			}
		});

		//TODO updateTimerとかにして共通化すべき
		function _setCurrentTime(elem, count) {
			elem.html(count);
		}

	});
})( window._ );
