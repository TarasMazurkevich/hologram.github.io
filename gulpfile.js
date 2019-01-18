'use strict';


const gulp = require('gulp');
const watch = require('gulp-watch');
const htmlminify = require("gulp-html-minify");
const cssmin = require('gulp-minify-css');
const prefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const rimraf = require('rimraf');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const browserSync = require("browser-sync");
const reload = browserSync.reload;


let path = {
    build: {
        file: './build/',
        html: './build/',
        php: './build/php/',
        js: './build/js/',
        style: './build/css/',
        img: './build/img/',
        fonts: './build/fonts/'
    },
    src: { 
        file: './source/.htaccess',
        html: './source/index.html',
        php: './source/php/*.php',
        js: './source/js/**/*.js',
        style: './source/scss/main.scss',
        img: './source/img/**/*.*', 
        fonts: './source/fonts/**/*.*'
    },
    watch: {
        file: './source/.htaccess',
        html: './source/index.html',
        php: './source/php/*.php',
        js: './source/js/**/*.js',
        style: './source/scss/**/*.scss',
        img: './source/img/**/*.*',
        fonts: './source/fonts/**/*.*'
    },
    clean: './build'
};

/* ------------ file build ------------- */
gulp.task('file:build', function() {
    return gulp.src(path.src.file)
        .pipe(gulp.dest(path.build.file))
        .pipe(reload({stream: true}));
});


/* ------------ html build ------------- */
gulp.task('html:build', function() {
	return gulp.src(path.src.html)
        .pipe(htmlminify())
		.pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});


/* ------------ php build ------------- */
gulp.task('php:build', function() {
    return gulp.src(path.src.php)
        .pipe(gulp.dest(path.build.php))
        .pipe(reload({stream: true}));
});


/* ------------ js build ------------- */
gulp.task('js:build', function() {
    return gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});


/* ------------ Style build ------------- */
gulp.task('style:build', function() {
    return gulp.src(path.src.style) 
        .pipe(sourcemaps.init()) 
        .pipe(sass()) 
        .pipe(prefixer()) 
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({stream: true}));
});


/* ------------ Image build ------------- */
gulp.task('image:build', function() {
    return gulp.src(path.src.img) 
        .pipe(imagemin({ 
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) 
        .pipe(reload({stream: true}));
});


/* ------------ Fonts build ------------- */
gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});


/* ------------ Watchers ------------- */
gulp.task('watch', function() {
    gulp.watch(path.watch.file, gulp.series('file:build'));
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.php, gulp.series('php:build'));
    gulp.watch(path.watch.style, gulp.series('style:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.img, gulp.series('image:build'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
});


/* ------------ Local sserver for livereload ------------- */
gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: "./build/"
        },
        notify: false
    });
})


/* ------------ Clean ------------- */
gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


/* ------------ Start ------------- */
gulp.task('default', gulp.series(
        'clean', 
        gulp.parallel('html:build', 'php:build', 'style:build', 'js:build', 'image:build', 'fonts:build', 'file:build'),
        gulp.parallel('watch', 'browser-sync')
    )
);