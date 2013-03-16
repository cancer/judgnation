/*
 * @refs http://met.hanatoweb.jp/archives/432/
 * @refs https://github.com/koba04/p5-petatube/blob/master/Gruntfile.js
 * @refs http://d.hatena.ne.jp/koba04/20130203/1359898395
 * @refs https://gist.github.com/shibu-t/4314906
 * */
module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			server: {
				options: {
					port: 9000,
					hostname: 'localhost'
				}
			}
		},
		watch: {
			scripts: {
				files: 'js/_src/*.js',
				tasks: ['concat', 'uglify']
			},
			css: {
				files: '_scss/*.scss',
				tasks: ['compass', 'cssmin']
			}
		},
		concat: {
			common: {
				files: {
					'js/all.js': [
						'js/_src/*.js'
					]
				}
			}
		},
		uglify: {
			common: {
				files: {
					'js/all.min.js': 'js/all.js'
					}
				}
			},
		compass: {
			dev: {
				src: '_scss/',
				dest: 'css/',
				linecomments: false,
				outputstyle: 'compressed',
				forcecompile: false,
				debugsass: false,
				relativeassets: false
			}
		},
		cssmin: {
			compress: {
				files: {
				'css/style-min.css': 'css/style.css'
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.registerTask('default', ['concat', 'uglify', 'compass', 'cssmin', 'connect', 'watch']);
}
