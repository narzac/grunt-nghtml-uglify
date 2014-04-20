'use strict';

var path = require('path'),
    chalk = require('chalk'),
    nghtmlUglify = require('nghtml-uglify');

module.exports = function(grunt) {
    grunt.registerMultiTask('nghtmlUglify', 'Uglify angular directives', function() {
        var symOk = 'OK',
            symNok = 'X',
            src = '',
            done = this.async(),
            options = this.options(),
            prefix = options.prefix || 'data-';

        options.directives = options.directives ? path.resolve(options.directives) : '';

        var directives = grunt.file.readJSON(options.directives);

        if(process.platform !== 'win32') {
            symOk  = '✔ ';
            symNok = '✖ ';
        }

        this.files.forEach(function(file) {
            src = file.src[0] || ' ';
            if(grunt.file.exists(src)) {
                src = grunt.file.read(src);
            } else {
                grunt.fail.warn(chalk.magenta.bold(symNok + ' "' + src + '" not found.'));
            }
            grunt.file.write(file.dest, nghtmlUglify(src, directives, prefix));
            grunt.log.writeln(chalk.cyan.bold(symOk, 'Uglified ' + file.dest + ' '));
        });
        done();
    });
};
