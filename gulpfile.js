'use strict';

var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var handlebars = require('gulp-compile-handlebars')
var rename = require('gulp-rename')
var htmlmin = require('gulp-htmlmin')
var exec = require('child_process').exec

gulp.task('sass', function() {
  return gulp.src('./src/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('html', function() {
    var data = {}
    var options = {
        batch: ['./src/templates/partials']
    }

    gulp.src('src/templates/pages/*.hbs')
        .pipe(handlebars(data, options))
        .pipe(rename({extname: '.html'}))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))
})

gulp.task('dev', ['sass', 'html'], function() {
    gulp.watch('./src/css/**/*.scss', ['sass'])
    gulp.watch('./src/templates/**/*.hbs', ['html'])

    exec('node app.js', function (err, stdout, stderr) {
        console.log(stdout)
        console.log(stderr)
        cb(err)
    });
})

gulp.task('build', ['sass', 'html'])
gulp.task('default', ['build'])
