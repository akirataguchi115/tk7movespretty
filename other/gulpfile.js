let gulp        = require('gulp');
let browserSync = require('browser-sync').create();
let sass        = require('gulp-sass');
let minify      = require('gulp-minify');
let cleanCSS    = require('gulp-clean-css');

function serve(minifyCss, minifyJs) {

    browserSync.init({
        server: "./../"
    });

    const watchCSS = () => gulp.watch("./../src/scss/*.scss", gulp.series(minifyCss))
    const watchJS = () => gulp.watch("./../src/js/**/*.js", gulp.series(minifyJs))
    const watchSync = () => gulp.watch("./../index.html").on('change', browserSync.reload);

    
    
    gulp.watch("./../src/scss/*.scss", minifyCss);
    gulp.watch("./../src/js/**/*.js", gulp.series(minifyJs));
    gulp.watch("./../index.html").on('change', browserSync.reload);
};

// Static Server + watching scss/html files
gulp.task('serve', gulp.series(minifyCss, minifyJs, function() {

    browserSync.init({
        server: "./../"
    });
    
    gulp.watch("./../src/scss/*.scss", gulp.series(minifyCss));
    gulp.watch("./../src/js/**/*.js", gulp.series(minifyJs));
    gulp.watch("./../index.html").on('change', browserSync.reload);
}));

// Compile sass into CSS & auto-inject into browsers
// gulp.task('sass', function() {
//     return gulp.src("./../src/scss/*.scss")
//         .pipe(sass())
//         .pipe(gulp.dest("./../src/css"))
//         .pipe(browserSync.stream());
// });

function minifyJs() {
    return gulp.src('./../src/js/**/*.js')
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        },
        ignoreFiles: ['*.min.js'],
        preserveComments: 'some',
        noSource: true
    }))
    .pipe(gulp.dest('./../dist/js/'))
}

// gulp.task('minify-js', function() {
//   gulp.src('./../src/js/**/*.js')
//     .pipe(minify({
//         ext:{
//             src:'.js',
//             min:'.min.js'
//         },
//         ignoreFiles: ['*.min.js'],
//         preserveComments: 'some',
//         noSource: true
//     }))
//     .pipe(gulp.dest('./../dist/js/'))
// });

function minifyCss() {
    return gulp.src('./../src/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./../dist/css'));
}

// gulp.task('minify-css',  ['sass'], () => {
//   return gulp.src('./../src/css/*.css')
//     .pipe(cleanCSS())
//     .pipe(gulp.dest('./../dist/css'));
// });

exports.default = gulp.series(minifyCss, minifyJs)
// gulp.task('default', ['serve']);