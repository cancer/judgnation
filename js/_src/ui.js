(function(_){

	var ProgressBar = function () {
		this.config = {};
		this.isInit = true;
		this.isAnimate = false;
		this.RAD = 0;
		this.timer;
		this.z;
		this.$elm;
	};

	ProgressBar.prototype = {
		init: function(config) {
			var that = this;
			that.config = $.extend({
				stroke_w: 30,
				path_size: 300,
				color: '#000000',
				step: 10,
				spd: 300,
				rad: 0,
				id: 'canvas',
				R: 120
			}, config);
			that.$elm = $('#'+that.config.id);
			that.$elm.css({
				width: that.config.path_size,
				height: that.config.path_size
			});
			that.RAD = that.config.rad;
			that.config.path_center = that.config.path_size/2;
			that.r = Raphael(that.config.id, that.config.path_size, that.config.path_size);

			// @param cx {Number} 円のx位置
			// @param cy {Number} 円のy位置
			// @param r {Number} 円の半径
			// @param value {Number} 弧の角度
			// @return {Object} 円弧のパス文字列
			that.r.customAttributes.arc = function (cx, cy, r, value) {
				var a =(90-value)*Math.PI/180,
				    x = cx+r*Math.cos(a),
				    y = cy-r*Math.sin(a),
				    path;
				if(value==360){
					path=[["M",cx,cy-r],["A",r,r,0,1,1,cx-0.001,cy-r]];
				}else{
					path=[["M",cx,cy-r], ["A",r,r,0,+(value>180),1,x,y]];
				}
				return {path: path, stroke: that.config.color};
			};

			that.z = that.r.path().attr({
				'arc': [
					that.config.path_center,
					that.config.path_center,
					that.config.R,
					that.config.rad
				],
				'stroke-width': that.config.stroke_w
			});

			that.update();
		},
		update: function(endCallback) {
			var that = this;
			var spd = that.config.spd;
			if (that.isAnimate) {
				return;
			}
			if (that.isInit) {
				spd = 0;
			}
			that.isAnimate = true;
			that.z.animate({
				'arc': [
					that.config.path_center,
					that.config.path_center,
					that.config.R,
					that.config.rad
				]
			}, spd, '<', function(){
				that.isAnimate = false;
				if (that.config.rad >= 360) {
					that.config.rad = 360;
					that.z.attr({
						'arc': [
							that.config.path_center,
							that.config.path_center,
							that.config.R,
							that.config.rad
						],
						'stroke-width': that.config.stroke_w
					});
					that.isInit = true;
					that.config.rad = 0;
					return;
				}else{
					that.isInit = false
					that.config.rad += 360/that.config.step;
				}
				endCallback && endCallback();
			});
		},
		reset: function(endCallback) {
			var that = this;
			// 角度を初期値に戻す
			that.isInit = false;
			that.config.rad = that.RAD;
			that.update();
		},
		show: function() {
			var that = this;
			clearTimeout(that.timer);
			that.$elm.show();
		},
		hide: function() {
			var that = this;
			clearTimeout(that.timer);
			if (that.isAnimate) {
				that.$elm.hide();
				return;
			}
			that.timer = setTimeout(function(){
				that.$elm.hide();
			}, 500);
		},
		getColor: function() {
			var that = this;
			return that.config.color;
		},
		setColor: function(color) {
			var that = this;
			that.config.color = color || that.config.color;
		}
	};
	window.progressBar = new ProgressBar();

})(window._);
