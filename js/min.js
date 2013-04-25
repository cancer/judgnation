(function(){var t=window.applicationCache,n=function(){};n.prototype={update:function(){t.addEventListener("updateready",function(){confirm("アプリケーションの新しいバージョンが利用可能です。更新しますか？")&&(t.swapCache(),location.reload())},!1)}},window.myAppCache=new n})(window._),function(){$(function(){myAppCache.update()})}(window._),function(){$(function(){var t=$("#jsSettingContainer"),n=$("#jsSettingTimer"),i=$("#jsBtnSettingSave"),o=$("#jsBtnSettingCancel"),e=$("#jsTimerContainer"),a=$("#jsBtnConfigOpen");a.bind({touchstart:function(t){t.preventDefault()},touchend:function(n){n.preventDefault(),t.show()}}),o.bind({touchstart:function(t){t.preventDefault()},touchend:function(n){n.preventDefault(),t.hide()}}),i.bind({touchstart:function(t){t.preventDefault()},touchend:function(i){i.preventDefault();var o=n.val();return""===o?(t.hide(),void 0):(judgnation.save("timer",o),judgnation.updateTimer(e,o),t.hide(),void 0)}})})}(window._),function(){var t=function(){this.oldSrc="",this.audio5js=function(){}};t.prototype={init:function(t){var n=this;t=t||{$allowBtn:$("#jsSoundStart"),$playBtn:$('[class*="btn_"]')},new Audio5js({ready:function(){n._attachEvent(this,t)}})},_attachEvent:function(t,n){var i=this;i.audio5js=t,n.$playBtn.on("touchstart.sound",function(t){i._onTouchStart(t)}),n.$playBtn.on("touchend.sound",function(t){i._onTouchEnd(t)}),i.audio5js.on("ended",function(){i.replay()})},play:function(t){var n=this;n.isPlaying||(n.oldSrc!==t?(n.oldSrc=t,n.audio5js.load(t),n.replay(),n.canPlay=!0):n.replay(),n.audio5js.on("canplay",function(){n.canPlay&&(n.canPlay=!0,n.replay())}))},replay:function(){var t=this;t.isPlaying=!0,t.audio5js.play()},stop:function(){var t=this;t.canPlay=!1,t.isPlaying=!1,t.audio5js.pause()},_onTouchStart:function(t){var n=this,i=t.currentTarget,o=$(i).attr("data-sound");t.preventDefault(),n.play(o)},_onTouchEnd:function(t){var n=this;t.preventDefault(),n.stop()}},window.judgeSound=new t}(window._),function(){$(function(){function t(){var t=judgnation.fetch("timer");clearInterval(d),v(e,t),progressBar.hide()}function n(t){var n;t||(f="",a.removeClass(g),r.removeClass(g),i()),t===h&&(f="A",n=h,a.addClass(g),r.removeClass(g)),t===l&&(f="B",n=l,a.removeClass(g),r.addClass(g)),i(n)}function i(t){t=t||p,o.css("background-color",t)}var o=$("#wrapper"),e=$("#jsTimerContainer"),a=$("#jsSecureButtonA"),r=$("#jsSecureButtonB"),c=$("#jsBtnContainer").find('[class*="btn_"]'),s=$("#jsSecureCancel"),u=judgnation.fetch("timer")||e.attr("data-interval"),d="",f="",h=a.attr("data-color"),l=r.attr("data-color"),p="#ede5e2",g="current",v=judgnation.updateTimer;progressBar.init({id:"jsProgressBar"}),judgeSound.init({$allowBtn:$("#jsSoundStart"),$playBtn:$("[data-sound]")}),v(e,u),c.bind("touchstart",function(i){i.preventDefault();var o=$(this),a=judgnation.fetch("timer");progressBar.show(),d=setInterval(function(){a--,0===a&&(t(),n(o.attr("data-color"))),v(e,a),progressBar.update()},1e3)}),c.bind("touchend",function(n){n.preventDefault(),t(),progressBar.reset(),progressBar.update()}),s.bind({touchstart:function(t){t.preventDefault()},touchend:function(i){i.preventDefault(),t(),n()}})})}(window._),function(){var t=function(){this.config={},this.isInit=!0,this.isAnimate=!1,this.RAD=0,this.timer,this.z,this.$elm};t.prototype={init:function(t){var n=this;n.config=$.extend({stroke_w:30,path_size:300,color:"#000000",step:10,spd:300,rad:0,id:"canvas",R:120},t),n.$elm=$("#"+n.config.id),n.$elm.css({width:n.config.path_size,height:n.config.path_size}),n.RAD=n.config.rad,n.config.path_center=n.config.path_size/2,n.r=Raphael(n.config.id,n.config.path_size,n.config.path_size),n.r.customAttributes.arc=function(t,i,o,e){var a,r=(90-e)*Math.PI/180,c=t+o*Math.cos(r),s=i-o*Math.sin(r);return a=360==e?[["M",t,i-o],["A",o,o,0,1,1,t-.001,i-o]]:[["M",t,i-o],["A",o,o,0,+(e>180),1,c,s]],{path:a,stroke:n.config.color}},n.z=n.r.path().attr({arc:[n.config.path_center,n.config.path_center,n.config.R,n.config.rad],"stroke-width":n.config.stroke_w}),n.update()},update:function(t){var n=this,i=n.config.spd;n.isAnimate||(n.isInit&&(i=0),n.isAnimate=!0,n.z.animate({arc:[n.config.path_center,n.config.path_center,n.config.R,n.config.rad]},i,"<",function(){return n.isAnimate=!1,n.config.rad>=360?(n.config.rad=360,n.z.attr({arc:[n.config.path_center,n.config.path_center,n.config.R,n.config.rad],"stroke-width":n.config.stroke_w}),n.isInit=!0,n.config.rad=0,void 0):(n.isInit=!1,n.config.rad+=360/n.config.step,t&&t(),void 0)}))},reset:function(){var t=this;t.isInit=!1,t.config.rad=t.RAD,t.update()},show:function(){var t=this;clearTimeout(t.timer),t.$elm.show()},hide:function(){var t=this;return clearTimeout(t.timer),t.isAnimate?(t.$elm.hide(),void 0):(t.timer=setTimeout(function(){t.$elm.hide()},500),void 0)},getColor:function(){var t=this;return t.config.color},setColor:function(t){var n=this;n.config.color=t||n.config.color}},window.progressBar=new t}(window._),function(){var t=function(){this.storage_prefix="judgnation_",this.localStorage=window.localStorage};t.prototype={save:function(t,n){var i=this,o=i.localStorage,e=i.storage_prefix;try{return o.setItem(e+t,n),!0}catch(a){return alert("プライベートブラウジングを解除してください"),!1}},fetch:function(t){var n=this,i=n.localStorage,o=n.storage_prefix;try{return i.getItem(o+t)}catch(e){return alert("プライベートブラウジングを解除してください"),!1}},updateTimer:function(t,n){t.html(n)}},window.judgnation=new t}(window._);