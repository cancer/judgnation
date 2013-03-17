module.exports = function(grunt){

	// load tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-compass');

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
			js: {
				files: 'js/_src/*.js',
				tasks: ['concat', 'uglify']
			},
			css: {
				files: '_scss/*.scss',
				tasks: ['compass', 'clean']
			}
		}
	});

	// resiter tasks
	grunt.registerTask('default', ['clean', 'compass', 'connect', 'concat', 'uglify']);
};

