(function( _ ){
	var appCache = window.applicationCache;
	var MyAppCache = function(){};
	MyAppCache.prototype = {
		update: function ( ) {
			appCache.addEventListener("updateready", function() {
				if (confirm('アプリケーションの新しいバージョンが利用可能です。更新しますか？')) {
					appCache.swapCache();
					location.reload();
				}
			}, false);
		}
	};
	window.myAppCache = new MyAppCache();
})( window._ );

(function( _ ){
	$(function(){
		myAppCache.update();
	});
})( window._ );

