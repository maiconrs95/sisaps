//importando gulp e plugins do node_modules
var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    removeHtmlComments = require('gulp-remove-html-comments'),
    stripCssComments = require('gulp-strip-css-comments'),
    strip = require('gulp-strip-comments'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin');

//Tarefa padrão do GULP
gulp.task('default', ['copy'], function () {
    gulp.start('build-img', 'uglify-html', 'uglify-css', 'uglify-js');
});

//Limpa a pasta dist para receber os novos arquivos de src
gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean());
});

//copia de dist para src após executar o clean
gulp.task('copy', ['clean'], function () {
    return gulp.src('src/**/*')
        .pipe(gulp.dest('dist'));
});

//automatiza as imagens, tem como dependência a copy
gulp.task('build-img', function () {
    gulp.src('src/img/*/**')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

//remove comentários html, tem como dependência o build-html
gulp.task('strip-html', function () {
    return gulp.src('dist/**/*.html')
        .pipe(removeHtmlComments())
        .pipe(gulp.dest('dist'));
});

//remover comentários js
gulp.task('strip-js', function () {
    return gulp.src('dist/**/*.js')
        .pipe(strip())
        .pipe(gulp.dest('dist'));
});

//remove comentários css
gulp.task('strip-css', function () {
    return gulp.src('dist/**/*.css')
        .pipe(stripCssComments())
        .pipe(gulp.dest('dist'))
});

//minifica html
gulp.task('uglify-html', ['strip-html'],function () {
    return gulp.src('dist/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
});

//minifica js
gulp.task('uglify-js', ['strip-js'], function () {
    return gulp.src('dist/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

//minifica css
gulp.task('uglify-css', ['strip-css'], function () {
    return gulp.src('dist/**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest('dist'));
});