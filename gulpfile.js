import gulp from 'gulp';
import browserSync from 'browser-sync';
import {deleteAsync} from 'del';
import fileInclude from 'gulp-file-include'


const src = './src';
const dist = './dist';

// Clean destination directory
export const clean = () => deleteAsync(dist);

const path = {
    src: {
        html: [`${src}/*.html`, `!${src}/_*.html`],
        // css: source_folder + "/scss/style.scss",
        // js: source_folder + "/js/script.js",
        // img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
        // fonts: source_folder + "/fonts",
    },
    dist: {
        html: `${dist}/`,
        // css: project_folder + "/css/",
        // js: project_folder + "/js/",
        // img: project_folder + "/img/",
        // fonts: project_folder + "/fonts/",
    },
}

function server() {
    browserSync.init({
        server: {
            baseDir: dist,
        },
        port: 3000,
        notify: false,
    });
}

export const html = () => {
    return gulp.src(path.src.html)
        .pipe(fileInclude())
        .pipe(gulp.dest(path.dist.html))
}


export const build = gulp.parallel(clean, html, server)
