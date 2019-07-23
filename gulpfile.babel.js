	/* Gulp should compile sass and make client side JS compatible - feel free to add your own tasks! */
'use strict';
 
import gulp from 'gulp';
import sass from 'gulp-sass';
import minifyCSS from 'gulp-csso';


sass.compiler = require('node-sass');
 
gulp.task('sass', () => {
  return gulp.src('./src/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCSS())
    .pipe(gulp.dest('./public/stylesheets'));
});
 
gulp.task('sass:watch', () => {
  gulp.watch('./src/scss/*.scss', gulp.series('sass'));
});