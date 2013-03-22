module.exports = function(grunt){
	var path = require('path');
	var matchde = require('matchdep');

	// load all grunt-plugin tasks
	matchde.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

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
		 copy: {
			app: {
				files: [
					{src: ['css/style.css'], dest: './site/public/stylesheets/style.css', filter: 'isFile'},
					{src: ['js/all.min.js'], dest: './site/public/javascripts/all.min.js', filter: 'isFile'}
				]
			}
		},
		// setup localhost
		// @url https://github.com/blai/grunt-express-example/blob/master/Gruntfile.js
		express: {
			livereload: {
				options: {
					port: 9000,
					bases: path.resolve('site'),
					monitor: {},
					debug: false,
					server: path.resolve('./web')
				}
			}
		},	
		regarde: {
			dist: {
				files: './site/*',
				tasks: ['livereload']
			},
			server: {
				files: 'web.js',
				tasks: ['express-restart:livereload']
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
				tasks: ['uglify', 'concat', 'compass', 'copy', 'clean'],
				options: {
					nospawn: true
				}
			},
			dev: {
				files: ['_scss/*.scss','js/_src/*.js', 'js/_lib/*.js'],
				tasks: ['concat:dev', 'compass', 'copy', 'clean'],
				options: {
					nospawn: true
				}
			}
		}
	});

	// resiter tasks
	//grunt.registerTask('server', ['livereload-start', 'regarde']);
	grunt.registerTask('default', ['clean', 'compass', 'uglify', 'concat', 'copy', 'watch']);
	grunt.registerTask('dev', ['clean', 'compass', 'concat:dev', 'copy', 'watch:dev']);
};

