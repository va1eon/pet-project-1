const gulp = require('gulp');
const gulpIf = require('gulp-if');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const del = require('del');
const htmlMin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const webpackStream = require('webpack-stream');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');
const image = require('gulp-image');
const webp = require('gulp-webp');
const browserSync = require('browser-sync').create();

const PATHS = {
  src: '_src',
  dist: 'dist',
}

//input files
PATHS.html = PATHS.src + '/**/*.html';
PATHS.scss = PATHS.src + '/scss/**/*.scss';
PATHS.resources = PATHS.src + '/resources/**';
PATHS.js = PATHS.src + '/js/main.js';
PATHS.imgWebp = PATHS.src + '/img/**/*.{jpg,jpeg}';
PATHS.img = [PATHS.src + '/img/*.{jpg,jpeg,png,svg}', PATHS.src + '/img/**/*.{jpg,jpeg,png}',];
PATHS.font = PATHS.src + '/fonts/**/*.woff2';

//output files
PATHS.css = PATHS.dist + '/css';
PATHS.outputJs = PATHS.dist + '/js';
PATHS.outputImg = PATHS.dist + '/img';
PATHS.outputFont = PATHS.dist + '/fonts';


let isProd = false //an default prod mod is disabled
const toProd = done => {
  isProd = true;
  done();
}

const clean = () => {
  return del([PATHS.dist])
}
const htmlMinify = () => {
  return gulp.src(PATHS.html)
    .pipe(htmlMin({collapseWhitespace: isProd}))
    .pipe(gulp.dest(PATHS.dist))
    .pipe(browserSync.stream())
}

const styles = () => {
  return gulp.src(PATHS.scss)
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(sass().on('error', notify.onError()))
    .pipe(autoprefixer({cascade: false}))
    .pipe(gulpIf(isProd, cleanCSS({level: 2})))
    .pipe(gulpIf(!isProd, sourcemaps.write()))
    .pipe(gulp.dest(PATHS.css))
    .pipe(browserSync.stream())
}

const scripts = () => {
  return(gulp.src(PATHS.js))
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(webpackStream({ mode: 'production' }))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(concat('main.js'))
    .pipe(gulpIf(isProd, uglify().on('error', notify.onError())))
    .pipe(gulpIf(!isProd, sourcemaps.write()))
    .pipe(gulp.dest(PATHS.outputJs))
    .pipe(browserSync.stream())
}

const images = () => {
  return gulp.src(PATHS.imgWebp)
    .pipe(webp({quality: 75}))
    .pipe(gulp.dest(PATHS.outputImg))
    .pipe(gulp.src(PATHS.img))
    .pipe(gulpIf(isProd, image()))
    .pipe(gulp.dest(PATHS.outputImg))
}

const resources = () => {
  return gulp.src(PATHS.resources)
    .pipe(gulp.dest(PATHS.dist))
}

const fonts = () => {
  return gulp.src(PATHS.font)
    .pipe(gulp.dest(PATHS.outputFont))
}

const serve = () => {
  browserSync.init({
    server: {
      baseDir: PATHS.dist
    },
    port: 5000
  });

  gulp.watch(PATHS.html, htmlMinify);
  gulp.watch(PATHS.scss, styles);
  gulp.watch(PATHS.js, scripts);
  gulp.watch(PATHS.img, images);
  gulp.watch(PATHS.resources, resources);
}

exports.default = gulp.series(clean, htmlMinify, fonts, images, styles, scripts, resources, serve) //start server
exports.dev = gulp.series(clean, htmlMinify, fonts, images, styles, scripts, resources) //dev mode
exports.build = gulp.series(clean, toProd, htmlMinify, fonts, images, styles, scripts, resources) //prod mode