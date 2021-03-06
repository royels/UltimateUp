var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  livereload = require('gulp-livereload'),
  stylus = require('gulp-stylus');
  jade = require('gulp-jade');

gulp.task('stylus', function () {
  gulp.src('./public/css/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});
gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('./lib/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('watch', function() {
  gulp.watch('./public/css/*.styl', ['stylus']);
});

gulp.task('develop', function () {
  livereload.listen();
  nodemon({
    script: 'bin/www',
    ext: 'js jade',
  }).on('restart', function () {
    setTimeout(function () {
      livereload.changed(__dirname);
    }, 500);
  });
});

gulp.task('default', [
  'stylus',
  'develop',
  'watch'
]);
