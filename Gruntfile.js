module.exports = function(grunt){

	var path = require('path');
	var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

	var folderMount = function folderMount(connect, point) {
		return connect.static(path.resolve(point));
	};

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
			livereload: {
				options: {
					port: 9000,
					middleware: function(connect, options) {
						return [lrSnippet, folderMount(connect, '.')]
					}
				}
			}
		},
		// Configuration to be run (and then tested)
		regarde: {
			fred: {
				files: ['index.html', 'css/style.css', 'js/all.js'],
				tasks: ['livereload']
			}
		},
		// concat JavasSript Files
		concat: {
			app: {
				files: {
					'js/all.js': [ 'js/_src/*.js' ]
				}
			}
		},
		// minify JavasSript Files
		uglify: {
			app: {
				files: {
					'js/all.min.js': 'js/all.js'
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
				files: ['_scss/*.scss','js/_src/*.js'],
				tasks: ['concat', 'uglify', 'compass', 'clean'],
				options: {
					nospawn: true
				}
			}
		}
	});

	// resiter tasks
	grunt.registerTask('default', ['clean', 'compass', 'livereload-start', 'connect', 'regarde', 'concat', 'uglify', 'watch']);
};

