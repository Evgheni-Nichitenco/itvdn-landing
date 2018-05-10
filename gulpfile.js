const gulp = require('gulp');
const browsersync =require('browser-sync').create();
const pug = require('gulp-pug');

// Server

gulp.task('server', function () {
   browsersync.init({
       server: {
           port: 9000,
           baseDir: "build"
       }
   });

   gulp.watch('build/**/*').on('change', browsersync.reload);

});


// Pug compile

gulp.task('templates:compile', function buildHTML() {
    return gulp.src('source/template/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
});

