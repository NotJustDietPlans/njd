var gulp = require('gulp');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var cache = require('gulp-cache');
var preprocess = require('gulp-preprocess');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var cssnext = require("gulp-cssnext");
var csso = require('gulp-csso');
var size = require('gulp-filesize');
var swig = require('gulp-swig');
var newer = require('gulp-newer');
var gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

var swigSrc = './app/html/*.html';
var swigDest = './build/';
var imgSrc = './app/images/*';
var imgDest = './build/public/images';
var uploadSrc = './app/uploads/*';
var uploadDest = './build/public/uploads';
var timestamp = Math.round(+new Date());

// server connect
gulp.task('connect', function () {
	connect.server({
		root: 'build',
		port: 9150,
		livereload: true
	});
});

// sass
gulp.task('sass', function () {
	gulp.src('./app/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(preprocess({context: { VER: timestamp}}))
		//.pipe(sass({outputStyle: 'compressed'}))
		.pipe(autoprefixer({
			cascade: true,
			browsers: [ '> 1%', 'last 2 versions', 'Firefox ESR', 'ie >= 9', 'Opera 12.1' ]
		}))
		.pipe(csscomb())
		//.pipe(cssnext({
		//	compress: true
		//}))
		//.pipe(csso())
		.pipe(gulp.dest('./build/public/css'))
		.pipe(size())
		.pipe(connect.reload())
		.pipe(notify('SASS compiled!'));
});

gulp.task('swig', function() {
	gulp.src(swigSrc)
		.pipe(newer(imgDest))
		.pipe(swig({
			defaults: { cache: false }
		}))
		.pipe(gulp.dest(swigDest))
		.pipe(connect.reload())
});

// js
gulp.task('js', function () {
	gulp.src('./app/js/*.js')
		.pipe(connect.reload())
		.pipe(gulp.dest('./build/public/js'));
});

// images
gulp.task('images', function () {
	return gulp.src(imgSrc)
		.pipe(newer(imgDest))
		.pipe(cache(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant({optimizationLevel: 3})]
		})))
		.pipe(gulp.dest(imgDest))
		.pipe(connect.reload());
});

// uploads
gulp.task('uploads', function () {
	return gulp.src(uploadSrc)
		.pipe(newer(uploadSrc))
		.pipe(cache(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant({optimizationLevel: 3})]
		})))
		.pipe(gulp.dest(uploadDest))
		.pipe(connect.reload());
});

// watch
gulp.task('watch', function () {
	gulp.watch('./app/sass/*.scss', ['sass']);
	gulp.watch('./app/blocks/**/sass/*.scss', ['sass']);
	gulp.watch('./app/html/*.html', ['swig']);
	gulp.watch('./app/blocks/**/html/*.html', ['swig']);
	gulp.watch('./app/js/*.js', ['js']);
	gulp.watch(imgSrc, ['images']);
	gulp.watch(uploadSrc, ['uploads'])
});

// default
gulp.task('default', ['swig', 'sass', 'js', 'images', 'uploads', 'connect', 'watch']);





