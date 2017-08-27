"use strict";

var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
	jsmin = require('gulp-jsmin'),
	fileinclude = require('gulp-file-include'),
    sass = require('gulp-sass');


// Compile sass into CSS 
gulp.task('sass', function() {
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/style/**/*.scss'])
    	.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer())
		.pipe(gulp.dest('src/dist'))
    	.pipe(browserSync.stream());
});


// Minify images
gulp.task('imagemin', function () {
   return gulp.src('src/build/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('src/img'));
});


// Minify js
gulp.task('jsmin', function () {
    gulp.src('src/build/js/*.js')
        .pipe(jsmin())
        .pipe(gulp.dest('src/js'));
});


// File include
gulp.task('fileinclude', function() {
  gulp.src(['src/build/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('src'));
});


// Move the javascript files into our /src/js folder
gulp.task('js', function() {
    return gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
        .pipe(gulp.dest("src/js"))
        .pipe(browserSync.stream());
});


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/style/**/*.scss'], ['sass']);
    gulp.watch(['src/build/**/*.html'], ['fileinclude']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
	gulp.watch("src/js/*.js").on('change', browserSync.reload);
});



// default
gulp.task('default', ['js','serve']);

// production
gulp.task('production', ['sass', 'imagemin', 'jsmin', 'fileinclude']);