const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');

gulp.task('minify-js', function () {
  return gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function () {
  return gulp.src('src/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
});

gulp.task('minify-html', function () {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.parallel('minify-js', 'minify-css', 'minify-html'));
