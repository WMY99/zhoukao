/*
 * @Author: 王美悦 
 * @Date: 2019-02-18 08:42:45 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-02-18 09:40:15
 */

var gulp = require("gulp")
var css = require("gulp-sass") //编译scss
var cssmin = require("gulp-clean-css") //压缩css
var jsmin = require("gulp-uglify") //压缩混淆js
var server = require("gulp-webserver") //起服务
var scripts = require("gulp-concat") //合并js
var babel = require("gulp-babel") //转换成ie6
var path = require("path") //path路径
var fs = require("fs") //读取文件返回
var url = require("url") //获取地址

//编译scss
gulp.task("addcss", function() {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(css())
        .pipe(gulp.dest("./src/css"))
})

//合并js
gulp.task("script", function() {
    return gulp.src("./src/js/**/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(scripts("all.js"))
        .pipe(gulp.dest("./dest/js"))
})

//起服务
gulp.task("server", function() {
    return gulp.src("./src")
        .pipe(server({
            port: "8080",
            host: "169.254.213.215",
            liverename: true,
            open: true,
            middleware: function(req, res, next) {
                //
                var pathname = url.parse(req.url).pathname
                if (pathname === "/favicon.ico") {
                    res.end("1")
                } else {
                    pathname = pathname === "/" ? "index.html" : pathname
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                }
                next()
            }
        }))
})

//并把文件生成到dist文件夹
gulp.task("build", function() {
    return gulp.src(["./src/css/**/*.css", "./src/js/**/*.js"])
        .pipe(gulp.dest("./dist"))
})

//监听css  js
gulp.task("lis", function() {
    return gulp.watch(["./src/scss/**/*.scss", "./src/js/**/*.js"], gulp.series("addcss", "script", "build"))
})

//监听所有
gulp.task("default", function() {
    return gulp.watch("./src", gulp.series("addcss", "script", "zipall", "server", "lis"))
})




//压缩css
gulp.task("zipcss", function() {
    return gulp.src("./src/css/**/*.css")
        .pipe(cssmin())
        .pipe(gulp.dest("./dest/css"))
})

//压缩js
gulp.task("zipjs", function() {
    return gulp.src("./src/js/**/*.js")
        .pipe(jsmin())
        .pipe(gulp.dest("./dest/js"))
})

//监听
gulp.task("zipall", function() {
    return gulp.watch(["./src/css/**/*.css", "./src/js/**/*.js"], gulp.parallel("zipcss", "zipjs"))
})