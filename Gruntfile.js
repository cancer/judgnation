/*
 * @refs http://met.hanatoweb.jp/archives/432/
 * @refs https://github.com/koba04/p5-petatube/blob/master/Gruntfile.js
 * @refs http://d.hatena.ne.jp/koba04/20130203/1359898395
 * @refs https://gist.github.com/shibu-t/4314906
 * */





module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		compass: {
			dev: {
				src: '_scss',
				dest: 'css',
				linecomments: true,
				forcecompile: true,
				require: [],
				debugsass: true,
				images: '',
				relativeassets: true
			},
			prod: {
				src: '_scss',
				dest: 'css',
				outputstyle: 'compressed',
				linecomments: false,
				forcecompile: true,
				require: [],
				debugsass: false,
				images: '',
				relativeassets: true
			}
		},
		mincss: {
			'css/style.min.css': [ 'css/style.css' ]
		},
		watch: {
			compass: {
				files: ['_scss/*.scss'],
				tasks: ['compass-dev', 'mincss']
			}
		}
	});
	// 
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	// Default task.
	grunt.registerTask('compass-dev', ['compass:dev']);
	grunt.registerTask('compass-prod', ['compass:prod']);
	// Default task.
	grunt.registerTask('default', 'compass-prod');
};




/*
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
			dist: {
				options: {
				}
			}
		},
		mincss: {
			compress: {
				files: {
					'css/style-min.css': 'css/style.css'
				}
			}
		},
		watch: {
			scripts: {
				files: 'js/_src/*.js',
				tasks: ['compass', 'mincss']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	//grunt.registerTask('default', ['concat', 'uglify', 'compass', 'cssmin', 'connect', 'watch']);
	grunt.registerTask('default', ['watch']);
}
*/
