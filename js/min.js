(function(){var t=window.applicationCache,n=function(){};n.prototype={update:function(){t.addEventListener("updateready",function(){confirm("アプリケーションの新しいバージョンが利用可能です。更新しますか？")&&(t.swapCache(),location.reload())},!1)}},window.myAppCache=new n})(window._),function(){$(function(){myAppCache.update()})}(window._),function(){$(function(){var t=$("#jsSettingContainer"),n=$("#jsSettingTimer"),o=$("#jsBtnSettingSave"),e=$("#jsBtnSettingCancel"),a=$("#jsTimerContainer"),i=$("#jsBtnConfigOpen");i.bind({touchstart:function(t){t.preventDefault()},touchend:function(n){n.preventDefault(),t.show()}}),e.bind({touchstart:function(t){t.preventDefault()},touchend:function(n){n.preventDefault(),t.hide()}}),o.bind({touchstart:function(t){t.preventDefault()},touchend:function(o){o.preventDefault();var e=n.val();return""===e?(t.hide(),void 0):(judgnation.save("timer",e),judgnation.updateTimer(a,e),t.hide(),void 0)}})})}(window._),function(){Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var n=Array.prototype.slice.call(arguments,1),o=this,e=function(){},a=function(){return o.apply(this instanceof e&&t?this:t,n.concat(Array.prototype.slice.call(arguments)))};return e.prototype=this.prototype,a.prototype=new e,a});var t=function(){this.oldSrc="",this.audio5js=function(){}};t.prototype={init:function(t){var n=this;t=t||{$allowBtn:$("#jsSoundStart"),$playBtn:$('[class*="btn_"]')},new Audio5js({ready:function(){n._attachEvent(this,t)}})},_attachEvent:function(t,n){var o=this;o.audio5js=t,n.$playBtn.on("touchstart.sound",function(t){o._onTouchStart(t)}),n.$playBtn.on("touchend.sound",function(t){o._onTouchEnd(t)}),o.audio5js.on("ended",function(){o.replay()})},play:function(t){var n=this;n.oldSrc!==t?(n.oldSrc=t,n.audio5js.load(t)):n.replay(),n.audio5js.on("canplay",function(){n.replay()})},replay:function(){var t=this;console.log(t.audio5js.isPlaying),t.audio5js.seek(0),t.audio5js.play(),t.isPlaying=!0},stop:function(){var t=this;t.audio5js.seek(0),t.audio5js.pause(),t.isPlaying=!1},_onTouchStart:function(t){var n=this,o=t.currentTarget,e=$(o).attr("data-sound");t.preventDefault(),n.play(e)},_onTouchEnd:function(t){var n=this;t.preventDefault(),console.log(n.audio5js.isPlaying),n.stop()}},window.judgeSound=new t}(window._),function(){$(function(){function t(){var t=judgnation.fetch("timer");clearInterval(d),y(a,t)}function n(t){var n;t||(l="",i.removeClass(v),r.removeClass(v),o()),t===f&&(l="A",n=f,i.addClass(v),r.removeClass(v)),t===p&&(l="B",n=p,i.removeClass(v),r.addClass(v)),o(n)}function o(t){t=t||h,e.css("background-color",t)}var e=$("#wrapper"),a=$("#jsTimerContainer"),i=$("#jsSecureButtonA"),r=$("#jsSecureButtonB"),u=$("#jsBtnContainer").find('[class*="btn_"]'),c=$("#jsSecureCancel"),s=judgnation.fetch("timer")||a.attr("data-interval"),d="",l="",f=i.attr("data-color"),p=r.attr("data-color"),h="#ede5e2",v="current",y=judgnation.updateTimer;judgeSound.init({$allowBtn:$("#jsSoundStart"),$playBtn:$("[data-sound]")}),y(a,s),u.bind("touchstart",function(o){o.preventDefault();var e=$(this),i=judgnation.fetch("timer");d=setInterval(function(){i--,0===i&&(t(),n(e.attr("data-color"))),y(a,i)},1e3)}),u.bind("touchend",function(n){n.preventDefault(),t()}),c.bind({touchstart:function(t){t.preventDefault()},touchend:function(o){o.preventDefault(),t(),n()}})})}(window._),function(){}(window._),function(){var t=function(){this.storage_prefix="judgnation_",this.localStorage=window.localStorage};t.prototype={save:function(t,n){var o=this,e=o.localStorage,a=o.storage_prefix;try{return e.setItem(a+t,n),!0}catch(i){return alert("プライベートブラウジングを解除してください"),!1}},fetch:function(t){var n=this,o=n.localStorage,e=n.storage_prefix;try{return o.getItem(e+t)}catch(a){return alert("プライベートブラウジングを解除してください"),!1}},updateTimer:function(t,n){t.html(n)}},window.judgnation=new t}(window._);