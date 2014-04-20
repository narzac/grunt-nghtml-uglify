'use strict';

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs-checker');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-html-validation');
    grunt.loadTasks('tasks');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            tmp: ['tmp/'],
            log: ['logs/'],
            dev: ['build/']
        },
        jshint: {
            options: {
                jshintrc: 'configs/jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ]
        },
        jscs:{
            options: {
                config: 'configs/jscs.json'
            },
            src: [
                'Gruntfile.js',
                'tasks/*.js'
            ]
        },
        nghtmlUglify: {
            options: {
                directives: 'configs/directives.json'
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'tests/',
                    src: ['*.html'],
                    dest: 'tmp/',
                    ext: '.ng.html',
                    extDot: 'first'
                }]
            }
        },
        htmlmin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: 'tmp/',
                    src: ['*.ng.html'],
                    dest: 'tmp/',
                    ext: '.min.html',
                    extDot: 'first'
                }]
            }
        },
        prettify: {
            options: {
                prettifyrc: 'configs/prettifyrc'
            },
            dev: {
                files: [{
                    expand: true,
                    cwd: 'tmp/',
                    src: ['*.min.html'],
                    dest: 'build/',
                    ext: '.html',
                    extDot: 'first'
                }]
            }
        },
        validation: {
            options: {
                charset: 'utf-8',
                doctype: 'HTML5',
                failHard: true,
                path: 'logs/html5_validation_status.json',
                reportpath: 'logs/html5_validation_report.json',
                reset: true,
                relaxerror: [
                    'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
                    'Element img is missing required attribute src.'
                ]
            },
            dev: {
                files: {
                    src: ['build/*.html']
                }
            }
        }
    });

    grunt.registerTask('default', [
        'clean', 'jshint',  'jscs',
        'nghtmlUglify', 'htmlmin', 'prettify', 'validation'
    ]);
};
