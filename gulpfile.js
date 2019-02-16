/*
 * @Author: 王美悦 
 * @Date: 2019-02-15 16:32:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-15 19:59:40
 */
var gulp = require("gulp")
var newcss = require("gulp-sass")
var mincss = require("gulp-clean-css")
var server = require("gulp-webserver")
    //编辑scss
gulp.task("addcss", function() {
        return gulp.src("./src/scss/**/*.scss")
            .pipe(newcss())
            .pipe(gulp.dest("./src/css"))
    })
    //监听
gulp.task("lis", function() {
        return gulp.watch("./src/scss/**/*.scss", gulp.series("addcss"));
    })
    //压缩css
gulp.task("zipcss", function() {
        gulp.src("./src/scss/**/*.scss")
            .pipe(mincss())
            .pipe(gulp.dest("./dist/css"))
    })
    //起服务
gulp.task("start", function() {
    return gulp.src("./src")
        .pipe(server({
            port: 8080,
            host: "169.254.213.215",
            open: true,
            livereload: true,
        }))
})