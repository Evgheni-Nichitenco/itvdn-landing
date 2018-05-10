const gulp = require('gulp');
const browsersync =require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');

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

// Styles compile

gulp.task('sass', function () {
    return gulp.src('source/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
});

// Sprite

gulp.task('sprite', function (cb) {
    const spriteData = gulp.src('source/images/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../images/sprite.png',
        cssName: 'sprite.scss'
    }));
    spriteData.img.pipe(gulp.dest('build/images/'));
    spriteData.css.pipe(gulp.dest('source/styles/global/'));
    cb();
});

// Delete

gulp.task('clean', function del(cb) {
   return rimraf('build', cb);
});
