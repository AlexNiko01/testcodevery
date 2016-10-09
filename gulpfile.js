var gulp = require('gulp'),
    scss = require('gulp-sass'),
    prefix = require('gulp-autoprefixer');

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}
gulp.task('styles', function () {
   gulp.src('assets/stylesheets/*.scss')
        .pipe(scss({ style: 'expanded', }))
        .pipe(prefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('css'))
       .on('error', swallowError);
});

gulp.task('default', ['styles'], function () {
    gulp.watch('assets/stylesheets/*.scss', ['styles']);
    // gulp.watch('scss/*.scss', ['styles']);
});

