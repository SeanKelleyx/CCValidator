"use strict";

var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	del = require('del');

gulp.task("minifyScript", function(){
	return gulp.src("ccValidator.js")
	.pipe(uglify())
	.pipe(rename("ccValidator.min.js"))
	.pipe(gulp.dest('./'));
});

gulp.task('watchFiles', function(){
	gulp.watch('ccValidator.js', ['default']);
});

gulp.task('clean', function(){
	del(['ccValidator.min.js']);
});

gulp.task("default", ['clean'], function(){
	gulp.start('minifyScript');
});