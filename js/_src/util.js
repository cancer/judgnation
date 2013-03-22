(function( _ ){
	var Judgnation = function(){
		this.storage_prefix = 'judgnation_';
		this.localStorage = window.localStorage;
	}
	Judgnation.prototype = {
		// TODO localStorage以外の場合も考慮
		save : function save(key, value){
			var that = this;
			var ls = that.localStorage;
			var prefix = that.storage_prefix;

			try{
				ls.setItem(prefix + key, value);
				return true;
			}catch(e){
				alert('プライベートブラウジングを解除してください');
				return false;
			}
		},
		// TODO localStorage以外の場合も考慮
		fetch : function fetch(key){
			var that = this;
			var ls = that.localStorage;
			var prefix = that.storage_prefix;

			try{
				return ls.getItem(prefix + key);
			}catch(e){
				alert('プライベートブラウジングを解除してください');
				return false;
			}
		},
		updateTimer : function(elem, count){
			elem.html(count);
		}
	};
	window.judgnation = new Judgnation();
})( window._ );
