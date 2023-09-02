import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import gcmq from 'gulp-group-css-media-queries';
import minify from 'gulp-minify';
import posthtml from 'gulp-posthtml';
import gulpSass from 'gulp-sass';
import strip from 'gulp-strip-comments';
import ttf2woff2 from 'gulp-ttf2woff2';
import webp from 'gulp-webp';
import include from 'posthtml-include';
import * as dartSass from 'sass';

const sass = gulpSass(dartSass);

const src = './src';
const dist = './dist';

const path = {
  src: {
    html: `${src}/index.html`,
    css: `${src}/scss/style.scss`,
    js: `${src}/js/*.js`,
    fonts: `${src}/assets/fonts/**/*.ttf`,
    icons: `${src}/assets/icons/**/*.{svg,png,ico}`,
    images: `${src}/assets/images/**/*.{png,jpg,jpeg}`,
  },
  dist: {
    html: `${dist}/`,
    css: `${dist}/css/`,
    js: `${dist}/js/`,
    fonts: `${dist}/assets/fonts/`,
    icons: `${dist}/assets/icons/`,
    images: `${dist}/assets/images/`,
  },
  watch: {
    html: `${src}/**/*.html`,
    css: `${src}/scss/**/*.scss`,
    js: `${src}/js/**/*.js`,
    icons: `${src}/assets/icons/**/*.svg`,
    images: `${src}/assets/images/**/*.{png,jpg,jpeg}`,
  },
};

const external_files = {
  css: [
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/swiper/swiper-bundle.min.css',
  ],
  js: [
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/swiper/swiper-bundle.min.js',
  ],
};

export const clean = () => deleteAsync(dist);

export const server = () => {
  browserSync.init({
    server: { baseDir: dist },
    port: 3000,
    notify: false,
    open: false,
  });
};

export const html = () => {
  return gulp
    .src(path.src.html)
    .pipe(posthtml([include()]))
    .pipe(strip())
    .pipe(gulp.dest(path.dist.html))
    .pipe(browserSync.stream());
};

export const scss = () => {
  return gulp
    .src(path.src.css, { allowEmpty: true })
    .pipe(sass({}, {}).on('error', sass.logError))
    .pipe(gcmq())
    .pipe(autoprefixer())
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.stream());
};

export const js = () => {
  return gulp
    .src(path.src.js)
    .pipe(
      minify({
        noSource: true,
        ext: {
          min: '.min.js',
        },
      }),
    )
    .pipe(gulp.dest(path.dist.js))
    .pipe(browserSync.stream());
};

export const external = () => {
  gulp.src(external_files.css).pipe(gulp.dest(path.dist.css));
  return gulp.src(external_files.js).pipe(gulp.dest(path.dist.js));
};

export const fonts = () => {
  return gulp
    .src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.dist.fonts));
};

export const icons = () => {
  return gulp
    .src(path.src.icons, { allowEmpty: true })
    .pipe(gulp.dest(path.dist.icons))
    .pipe(browserSync.stream());
};

export const images = () => {
  return gulp
    .src(path.src.images, { allowEmpty: true })
    .pipe(webp())
    .pipe(gulp.dest(path.dist.images))
    .pipe(browserSync.stream());
};

const watch = () => {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.css, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.icons, icons);
  gulp.watch(path.watch.images, images);
};

export const build = gulp.series(
  clean,
  gulp.parallel(html, scss, js, external, fonts, icons, images),
);
export const dev = gulp.parallel(build, watch, server);
