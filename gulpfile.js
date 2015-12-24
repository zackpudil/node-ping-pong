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

gulp.task("browserify", ['babelify'],  function () {
	return gulp.src("dist/app.js")
		.pipe(browserify({
			insertGlobals: true
		}))
		.pipe(rename("ping-pong.js"))
		.pipe(gulp.dest("./"));
});

gulp.task("default", ["browserify"], function () {
	gulp.watch('src/**/*.js', ['browserify']);
});