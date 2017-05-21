var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var processhtml  = require('gulp-processhtml');
var rename       = require('gulp-rename');
var minify       = require('gulp-minify');
var del          = require('del');
var runSeq       = require('run-sequence');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;
 

gulp.task('styles', function() {
    gulp.src('src/assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true, outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./src/assets/css/'))
        .pipe(reload({stream:true}));
});

gulp.task('browser', function () {
    browserSync({
        server: {
            baseDir: './dist'
        }
    });
});

gulp.task('clean', function() {
    del(['dist/**/*']);
});

gulp.task('process-html', function () {
    gulp.src('src/index.html')
        .pipe(processhtml())
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({ stream: true}));
});

gulp.task('build-css', function() {
    gulp.src('src/assets/scss/**/*.scss')
        .pipe(sass({errLogToConsole: true, outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build-js', function () {
    gulp.src('src/assets/js/**/*.js')
        .pipe(minify({ ext: { min:'.min.js' }}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('reload', function() {
});

gulp.task('build', function() {
    runSeq('clean', 'build-css', 'build-js', 'process-html');
})

gulp.task('default', ['styles', 'build', 'browser'], function() {
    gulp.watch('src/assets/scss/**/*.scss', ['styles']);
    gulp.watch(['src/index.html', 'src/assets/js/**/*js', 'src/assets/scss/**/*.scss'], ['build']);
});