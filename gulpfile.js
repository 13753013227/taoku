// 1.导出模块
const gulp = require('gulp');
const sass = require('gulp-sass');
const html = require('gulp-htmlmin');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');



//2.发布任务
function fnCopyIndex(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
}

// function fnCss(){
//     return gulp.src('./src/sass/*.scss')
//     .pipe(cssnano())
//     .pipe(rename({suffix : ".min"}))
//     .pipe(gulp.dest('./dist/css'));
// }
function fnCss(){
    return gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    // .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/css'));
}

function fnJs(){
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    // .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/js'));
}

function fnImg(){
    return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
}

function fnHtml(){
    return gulp.src('./src/pages/*.html')
    .pipe(html())
    .pipe(gulp.dest('./dist/pages'));
}
function fnLib(){
    return gulp.src('./src/lib/**/*')
    .pipe(gulp.dest('./dist/lib'));
}
//监听任务
function fnWatch(){
    gulp.watch('./src/index.html',fnCopyIndex);
    gulp.watch('./src/sass/*.scss',fnCss);
    gulp.watch('./src/js/*.js',fnJs);
    gulp.watch('./src/pages/*.html',fnHtml);
    gulp.watch('./src/img/*',fnImg);
    gulp.watch('./src/lib/**/*',fnLib);
}
//3.导出模块
exports.copyIndex = fnCopyIndex;
exports.css = fnCss;
exports.js = fnJs;
exports.img = fnImg;
exports.html = fnHtml;
exports.lib = fnLib;
exports.default = fnWatch;