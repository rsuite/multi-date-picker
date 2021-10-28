/* eslint-disable @typescript-eslint/no-var-requires */
const del = require('del');
const babel = require('gulp-babel');
const gulp = require('gulp');
const babelrc = require('./babel.config.js');

function clean(done) {
  del.sync(['./lib'], { force: true });
  done();
}

function buildLib() {
  return gulp
    .src(['./src/**/*.tsx', './src/**/*.ts'])
    .pipe(babel(babelrc()))
    .pipe(gulp.dest('./lib'));
}

exports.build = gulp.series(clean, buildLib);
