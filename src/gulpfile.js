var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');
var exec = require('child_process').exec;
var paths = {
  appDir: './app/**/*.js',
  libDir: './lib'
};

gulp.task('clean', function gulpClean() {
  return del(paths.libDir);
});

gulp.task('build', ['clean'], function gulpBuild() {
  return gulp.src(path.appDir)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir));
});

gulp.task('main', ['build'], function gulpMain(callback) {
  exec(`node ${ paths.libDir }`, function consoleHandler(error, stdout) {
   console.log(stdout);
   return callback(error);
  });
});

gulp.task('watch', function gulpWatch() {
  gulp.watch(paths.appDir, ['main']);
});

gulp.task('default', ['watch', 'main']);
