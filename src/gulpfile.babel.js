import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import { exec } from 'child_process';
const paths = {
  appDir: './app/**/*.js',
  libDir: './lib'
};

gulp.task('clean', () => {
  return del(paths.libDir);
});

gulp.task('build', ['clean'], () => {
  return gulp.src(paths.appDir)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir));
});

gulp.task('main', ['build'], (callback) => {
  exec(`node ${ paths.libDir }`, (error, stdout) => {
   console.log(stdout);
   return callback(error);
  });
});

gulp.task('watch', () => {
  gulp.watch(paths.appDir, ['main']);
});

gulp.task('default', ['watch', 'main']);
