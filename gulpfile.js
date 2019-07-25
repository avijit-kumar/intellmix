const { series, src, dest, watch }  = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');


// Compile Sass & Inject Into Browser
function style() {
    return src(['src/scss/style.scss'])
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssbeautify())
        .pipe(dest("src/css"))
        .pipe(browserSync.stream());
}



// Watch Sass & Serve
function serve() {
    browserSync.init({
        server: "./src"  
    });

    watch(['src/scss/*.scss'], style);
    watch("src/*.html").on('change', browserSync.reload);
}

// Default Task
exports.default = series(serve);