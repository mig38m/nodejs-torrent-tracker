var gulp = require('gulp');
var mocha = require('gulp-mocha');
var ts  = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var del = require('del');

gulp.task('default', ['compile']);

gulp.task('clean', function () {
  return del('release');
});

gulp.task('compile', ['clean'], function () {
  return tsProject.src()
    .pipe(ts(tsProject))
    .pipe(gulp.dest('release'));
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.ts', ['compile']);
});

gulp.task('watch-test', function () {
  gulp.watch(['app/**/*.ts', 'test/**/*.js'], ['test']);
});

gulp.task('test', ['compile'], function () {
  return gulp.src('test/**/*.test.js', {read: false})
    .pipe(mocha({reporter: 'dot'}));
});
