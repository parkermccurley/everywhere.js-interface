import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import flow from 'gulp-flowtype';
import mocha from 'gulp-mocha';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackDevServer from 'webpack-dev-server';
import webpackConfig from './config/webpack.config.babel';
import webpackDevConfig from './config/webpack.dev.config.babel';

const paths = {
  webpackFile: './config/webpack.config.babel.js',
  webpackDevFile: './config/webpack.dev.config.babel.js',
  webpackEntry: './app/index.jsx',
  webpackClientBundle: './dist/bundle.js?(.map)',
  gulpFile: './gulpfile.babel.js',
  tests: './lib/**/*.spec.js',
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
    paths.webpackDevFile,
    paths.gulpFile,
    paths.app
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(flow({ abort: true }))
});

gulp.task('build', ['lint', 'clean'], () =>
  gulp.src(paths.app)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir))
);

gulp.task('test', ['build'], () =>
  gulp.src(paths.tests)
    .pipe(mocha())
);

gulp.task('webpack', ['build'], () =>
  gulp.src(paths.webpackEntry)
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(paths.distDir))
);

gulp.task('watch', () => {
  gulp.watch(paths.app, ['webpack']);
});

gulp.task('development', (callback) => {
  new webpackDevServer(webpack(webpackDevConfig), {
    stats: {
      colors: true
    }
  }).listen(8080, "localhost");
});

gulp.task('default', ['development', 'watch']);
