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
	grunt.registerTask('default', ['clean', 'compass', 'connect:server', 'concat', 'uglify', 'watch']);
};

