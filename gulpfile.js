var gulp = require("gulp");
var babel = require("gulp-babel");
var install = require("gulp-install");
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

gulp.task("app-install", function () {
	gulp
		.src('./app/package.json')
		.pipe(install());
});

gulp.task("package", ["build", "app-install"], function() {
	var packageJson = require('./app/package.json');
	gulp.src("")
		.pipe(electron({
			src: './app',
			packageJson: packageJson,
			version: 'v0.36.2',
			release: './release',
			cache: './cache',
			packaging: false,
			platforms: ['darwin-x64', 'win32-ia32'],
			platformResources: {
				darwin: {
            CFBundleDisplayName: packageJson.name,
            CFBundleIdentifier: packageJson.name,
            CFBundleName: packageJson.name,
            CFBundleVersion: packageJson.version
        },
        win: {
            "version-string": packageJson.version,
            "file-version": packageJson.version,
            "product-version": packageJson.version
        }
			}
		}))
		.pipe(gulp.dest(""));
});