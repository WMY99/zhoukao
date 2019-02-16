/*
 * @Author: 王美悦 
 * @Date: 2019-02-16 09:11:34 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-16 10:12:49
 */
var gulp = require("gulp")
var mincss = require("gulp-clean-css")
var css = require("gulp-sass")
var ujs = require("gulp-uglify")
var server = require("gulp-webserver")
var concat = require('gulp-concat');
//编译css
gulp.task("addcss", function() {
        return gulp.src("./src/scss/**/*.scss")
            .pipe(css())
            .pipe(gulp.dest("./src/css"))
    })
    //监听
gulp.task("lis", function() {
        return gulp.watch(["./src/scss/**/*.scss", "./src/js/**/*.js"], gulp.parallel("addcss", "scripts"))

    })
    //压缩css
gulp.task("zipcss", function() {
    return gulp.src("./src/css/**/*.css")
        .pipe(mincss())
        .pipe(gulp.dest("./dist/css"))
})

//合并js
gulp.task('scripts', function() {
    return gulp.src('./src/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/js'));
});

//压缩js
gulp.task("zipjs", function() {
    return gulp.src("./src/js/**/*.js")
        .pipe(ujs())
        .pipe(gulp.dest("./dist/js"))
})
gulp.task("servers", function() {
    return gulp.src("./src")
        .pipe(server({
            port: 8080,
            host: "169.254.213.215",
            open: true,
            livereload: true,
        }))
})

gulp.task("default", gulp.series("scripts", "addcss", "servers", "lis"))

gulp.task("build", gulp.parallel("zipjs", "zipcss"))