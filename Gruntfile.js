/*
 * @refs http://met.hanatoweb.jp/archives/432/
 * @refs https://github.com/koba04/p5-petatube/blob/master/Gruntfile.js
 * @refs http://d.hatena.ne.jp/koba04/20130203/1359898395
 * @refs https://gist.github.com/shibu-t/4314906
 * */
module.exports = function(grunt){

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-compass');

	grunt.initConfig({
		growl: {
			done: {
				title: 'grunt',
				message: 'SUCCESSED!!'
			}
		},
		compass: {
			app: {
				src: '_scss/',
				dest: 'css/'
			}
		},
		watch: {
			app: {
				files: '_scss/*.scss',
				tasks: 'compass'
			}
		}
	});
	grunt.registerTask('default', 'compass');
};

