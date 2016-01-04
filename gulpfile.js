var gulp = require("gulp");
var babel = require("gulp-babel");
var electron = require("gulp-electron");

gulp.task("build", function () {
	return gulp.src("src/**/*.js")
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest("./app/dist"));
});

gulp.task("default", ["build"], function () {
	gulp.watch('src/**/*.js', ['build']);
});

var packageJson = require('./package.json');

gulp.task("package", ["build"], function () {
	gulp.src("")
		.pipe(electron({
			src: './app',
			packageJson: packageJson,
			release: './app/release',
			cache: './app/cache',
			version: 'v1.0.0',
			packaging: true,
			platforms: ['darwin-x64', 'win32'],
			platformResources: {
				darwin: {
					CFBundleDisplayName: packageJson.name,
					CFBUndleIdentifier: packageJson.name,
					CFBundleName: packageJson.name,
					CFBundleVersion: packageJson.name,
					icon: 'gulp-electron.icns'
				},
				win: {
					"version-string": packageJson.version,
					"file-version": packageJson.version,
					"product-version": packageJson.version,
					"icon": "gulp-electron.ico"
				}
			}
			}))
			.pipe(gulp.dest(""));
})