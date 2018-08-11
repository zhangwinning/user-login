const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

gulp.task('nodemon', () => {
    nodemon({
        script: './app.js',
        ext: 'js',
        watch: ['lib', 'app.js'],
        ignore: ['test'],
        delay: 1.5,
    }).on('restart', () => {
        console.log('server restarted!')
    })
})

gulp.task('default', ['nodemon'])
