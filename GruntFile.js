module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: require('./require.json')
            }
        },
        copy: {
            package: {
                files: [
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'src/',
                        src: ['media/**', 'js/libs/require-js/**', 'index.html'],
                        dest: 'build/'
                    }
                ]
            },
            localhost: {
                files: [
                {
                        expand: true,
                        flatten: false,
                        cwd: 'build',
                        src: ['**'],
                        dest: '/var/www/march1gam'
                    }
                ]
            }
        }
    });

    grunt.registerTask('install', 'Run local Grunt.', function () {
        var bower = spawn('./node_modules/.bin/bower', ['install'])
        bower.stdout.pipe(process.stdout)
        bower.stderr.pipe(process.stderr)
        bower.on('exit', this.async())
    })

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['requirejs', 'copy']);

}
