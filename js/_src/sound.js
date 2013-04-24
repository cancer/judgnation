(function(_){

	var JudgeSound = function () {
		this.oldSrc = '';
		this.audio5js = function () {};
	}

	JudgeSound.prototype = {

		/**
		 * @param config {Object} イベントを設定する要素など
		 */
		init: function (config) {
			var that = this;
			config = config || {
				$allowBtn: $('#jsSoundStart'),
				$playBtn: $('[class*="btn_"]')
			};
			new Audio5js({
				ready: function () {
					that._attachEvent(this, config);
				}
			});
		},

		/**
		 * @param Audio5js {Object} Audio5jsオブジェクト
		 * @param config {Object} イベントを設定する要素など
		 */
		_attachEvent: function (Audio5js, config) {
			var that = this;
			that.audio5js = Audio5js;
			config.$playBtn.on('touchstart.sound', function(e){
				that._onTouchStart(e);
			});
			config.$playBtn.on('touchend.sound', function(e){
				that._onTouchEnd(e);
			});
			that.audio5js.on("ended", function() {
				that.replay();
			});
		},

		/**
		 * srcをロードして再生する
		 * @param src {String} 音声ファイルのパス
		 */
		play: function (src) {
			var that = this;
			// もし再生中であれば反応しない
			if (that.isPlaying) {
				return;
			}
			// 初回のみロードしてから再生
			if (that.oldSrc !== src) {
				that.oldSrc = src;
				that.audio5js.load(src);
				that.replay();
				that.canPlay = true;
			}else{
				that.replay();
			}
			that.audio5js.on("canplay", function() {
				if (!that.canPlay) {
					return;
				}
				that.canPlay = true;
				that.replay();
			});
		},

		/**
		 * 再生位置を最初に戻して、再生する
		 */
		replay: function () {
			var that = this;
			that.isPlaying = true;
			that.audio5js.play();
		},

		/**
		 * 再生位置を最初に戻して、一時停止する
		 */
		stop: function () {
			var that = this;
			that.canPlay = false;
			that.isPlaying = false;
			that.audio5js.pause();
		},

		/**
		 * タッチした時の設定
		 */
		_onTouchStart: function (e) {
			var that = this;
			var elm = e.currentTarget;
			var src = $(elm).attr('data-sound');
			e.preventDefault();
			that.play(src);
		},

		/**
		 * タッチ終了した際の設定
		 */
		_onTouchEnd: function (e) {
			var that = this;
			e.preventDefault();
			that.stop();
		}
	};
	window.judgeSound = new JudgeSound();
})(window._);
