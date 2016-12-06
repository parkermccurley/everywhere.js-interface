import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.babel';
const paths = {
  webpackFile: './webpack.config.babel.js',
  webpackEntry: './app/index.jsx',
  webpackClientBundle: './dist/bundle.js?(.map)',
  gulpFile: './gulpfile.babel.js',
  app: './app/**/*.js?(x)',
  libDir: './lib',
  distDir: './dist'
};

gulp.task('clean', () => del([
  paths.libDir,
  paths.webpackClientBundle
]));

gulp.task('lint', () => {
  gulp.src([
    paths.webpackFile,
    paths.gulpFile,
    paths.app
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', ['clean', 'lint'], () =>
  gulp.src(paths.app)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir))
);

gulp.task('main', ['clean', 'lint'], () =>
  gulp.src(paths.webpackEntry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.distDir))
);

gulp.task('watch', () => {
  gulp.watch(paths.app, ['main']);
});

gulp.task('default', ['watch', 'main']);
