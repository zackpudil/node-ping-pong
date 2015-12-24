var gulp = require("gulp");
var babel = require("gulp-babel");
var browserify = require("gulp-browserify");
var rename = require("gulp-rename");

gulp.task("babelify", function () {
	return gulp.src("src/**/*.js")
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest("./dist"));
});

gulp.task("default", ["babelify"], function () {
	gulp.watch('src/**/*.js', ['babelify']);
});