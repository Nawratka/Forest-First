const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const reload = browserSync.reload;

const paths = {
	html: './html/**/*.kit',
	sass: './src/sass/**/*.scss',
	js: './src/js/**/*.js',
	img: './src/img/*',
	dist: './dist',
	sassDest: './dist/css',
	jsDest: './dist/js',
	imgDest: './dist/img',
};



function sassCompiler(done) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDest));
	done();
}

function jsBundle(done) {
	src(['./src/js/main.js', './src/js/modules/contact.js'])
		.pipe(concat('contactpage.js'))
		.pipe(dest('./src/js'));
	src(['./src/js/main.js', './src/js/modules/scrollspy.js'])
		.pipe(concat('homepage.js'))
		.pipe(dest('./src/js'));
	done();
}

function javascriptCompiler(done) {
	src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.jsDest));
	done();
}

function convertImages(done) {
	src(paths.img).pipe(imagemin()).pipe(dest(paths.imgDest));
	done();
}

function clearStuff(done) {
	src(paths.dist, { read: false }).pipe(clean());
	done();
}

function startBrowserSync(done) {
	browserSync.init({
		server: { baseDir: './' },
	});
	done();
}

function watchForChanges(done) {
	// watch('./*.html').on("change", reload);
	watch(
		[paths.html, paths.sass, paths.js],
		parallel(sassCompiler, javascriptCompiler)
	).on('change', reload);
	watch(paths.img, convertImages).on('change', reload);
	done();
}

const mainFunctions = parallel(
	sassCompiler,
	jsBundle,
	javascriptCompiler,
	convertImages
);
exports.clearStuff = clearStuff;
exports.default = series(mainFunctions, startBrowserSync, watchForChanges);
