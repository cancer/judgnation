(function(_){
	var JudgeSound = function () {
		this.loaded = false;
	}

	JudgeSound.prototype = {
		mp3: [
			'/song.mp3'
		],
		init: function (config) {
			var that = this;
			that.audio5js = new Audio5js({
				ready: function () {
					var btn = document.getElementById('play-pause');
					btn.addEventListener('click', that.play.bind(this), false);
				}
			});
		},
		play: function () {
			var that = this;
			if (!that.loaded) {
				that.audio5js.on('canplay', function () {
					that.loaded = true;
					this.play();
				}, that.audio5js);
				that.audio5js.load('/song.mp3');
			} else {
				that.play();
			}
		},
		stop: function () {
			var that = this;
		}
	};
	window.judgeSound = new JudgeSound();
})(window._);
