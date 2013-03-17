module.exports = function(grunt){
	// load all grunt-plugin tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	// init config
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// delete some files
		clean: {
			app: {
				force: true,
				src: ['_scss/*.css','_scss/.*','*/.DS_Store']
			}
		},
		// setup localhost
		// @url https://gist.github.com/konitter/5001702
		connect: {
			server: {
				options: {
					port: 9000,
					hostname: 'localhost'
				}
			}
		},
		// concat JavasSript Files
		concat: {
			app: {
				files: {
					'js/lib.js': [ 'js/_lib/jquery-1.9.1.min.js', 'js/_lib/underscore.min.js', 'js/_lib/backbone.min.js' ],
					'js/all.min.js': [ 'js/lib.js', 'js/min.js' ]
				}
			},
			dev: {
				files: {
					'js/lib.js': [ 'js/_lib/jquery-1.9.1.min.js', 'js/_lib/underscore.min.js', 'js/_lib/backbone.min.js' ],
					'js/all.min.js': [ 'js/lib.js', 'js/_src/*.js' ]
				}
			}
		},
		// minify JavasSript Files
		uglify: {
			app: {
				files: {
					'js/min.js': [ 'js/_src/*.js' ]
				}
			}
		},
		// compile scss to css
		compass: {
			app: {
				src: '_scss/',
				dest: 'css/',
				outputstyle: 'compressed',
				linecomments: true,
				forcecompile: true
			}
		},
		// watch some files status
		watch: {
			app: {
				files: ['_scss/*.scss','js/_src/*.js', 'js/_lib/*.js'],
				tasks: ['uglify', 'concat', 'compass', 'clean'],
				options: {
					nospawn: true
				}
			},
			dev: {
				files: ['_scss/*.scss','js/_src/*.js', 'js/_lib/*.js'],
				tasks: ['concat:dev', 'compass', 'clean'],
				options: {
					nospawn: true
				}
			}
		}
	});

	// resiter tasks
	grunt.registerTask('default', ['clean', 'compass', 'connect:server', 'uglify', 'concat', 'watch']);
	grunt.registerTask('dev', ['clean', 'compass', 'connect:server', 'concat:dev', 'watch:dev']);
};

