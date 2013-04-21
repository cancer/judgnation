(function(_){
	var JudgeSound = function () {
		this.loaded = false;
	}

	JudgeSound.prototype = {
		init: function (config) {
			var that = this;
			config = config || {
				$allowBtn: $('#jsSoundStart'),
				$playBtn: $('[class*="btn_"]')
			};

			that.audio5js = new Audio5js({
				ready: function () {
					var audio = this;
					var oldSrc;
					config.$playBtn.on('touchstart.sound', function(e){
						e.preventDefault();
						var src = $(this).attr('data-sound');
						if (oldSrc !== src) {
							oldSrc = src;
							audio.load(src);
						}else{
							audio.seek(0);
							audio.play();
							that.isPlaying = true;
						}
						audio.on("canplay", function() {
							audio.seek(0);
							audio.play();
							that.isPlaying = true;
						});
					});
					config.$playBtn.on('touchend.sound', function(e){
						e.preventDefault();
						audio.seek(0);
						audio.pause();
						that.isPlaying = false;
					});

					audio.on("ended", function() {
						audio.seek(0);
						audio.play();
						that.isPlaying = true;
					});

					audio.on("error" , function (error) {
					});
				}
			});
		},
		play: function () {
			var that = this;
		},
		stop: function () {
			var that = this;
		}
	};
	window.judgeSound = new JudgeSound();
})(window._);
