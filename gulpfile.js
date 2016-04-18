'use strict';
//if you wanna attach karma star to gulp, you can, but make sure bundle first and make sure it finishes before running test
const gulp = require('gulp');
const lint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const paths = ['*.js', 'test/*.js'];
const webpack = require('gulp-webpack');

const source = {
  html: __dirname + '/app/index.html',
  js: __dirname + '/app/index.js',
  test: __dirname + '/test/*_spec.js'
};

gulp.task('copy', ()=>{
  return gulp.src(source.html)
    .pipe(gulp.dest('./build'))
});

gulp.task('bundle:test', ()=>{
  return gulp.src(source.test)
    .pipe(webpack({
      watch: true,
      output: {
        filename: 'test_bundle.js'
      },
      module: {
        loaders: [
          {test:  /\.css$/, loader: 'style!css'},
        ],
      },
    }))
    .pipe(gulp.dest('./test'));
});

gulp.task('bundle:dev', function(){
  return gulp.src(__dirname + '/app/index.js')
  .pipe(webpack({
    watch: true,
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {test:  /\.css$/, loader: 'style!css'},
      ],
    },
  }))
  .pipe(gulp.dest('build/'));
})

gulp.task('lint', function(){
  return gulp.src(paths)
  .pipe(lint())
  .pipe(lint.format());
});

gulp.task('test', function(){
  return gulp.src( __dirname + '/test/test.js', {read: false})
  .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watcher', function(){
  gulp.watch( __dirname + '/**/*.js', ['lint', 'test', 'bundle:dev']);
});
