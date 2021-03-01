/*
 * @Author: hp
 * @Date: 2021-02-28 23:26:08
 * @LastEditTime: 2021-03-02 00:19:22
 * @LastEditors: your name
 * @Description:gulp配置
 * @FilePath: /proj/gulpfile.js
 */
var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require('watchify') // 监听文件编辑变化
var gutil = require("gulp-util") // gulp工具函数
var tsify = require("tsify"); // 可以访问ts编译器
var uglify = require("gulp-uglify")
var sourcemaps = require("gulp-sourcemaps")
var buffer = require("vinyl-buffer")
var paths = {
  pages: ['src/*.html']
};

var watchedBrowserify = watchify(browserify({ // 把browsrify 包裹在watchify的调用中，控制生成的结果
  baserdir: ",",
  debug: true, // 开启source map， 浏览器可以调试
  entries: ["src/main.ts"],
  cache: {},
  packageCache: {}
})).plugin(tsify)
  .transform("babelify", {
    presets: ['es2015'],
    extensions: ['.ts']
  })

gulp.task("copy-html", function () {
  return gulp.src(paths.pages)
    .pipe(gulp.dest("dist"));
});

// gulp.task("default", ["copy-html"], function () {
//   return browserify({
//     basedir: '.',
//     debug: true,
//     entries: ['src/main.ts'],
//     cache: {},
//     packageCache: {}
//   })
//     .plugin(tsify)
//     .bundle()
//     .pipe(source('bundle.js'))
//     .pipe(gulp.dest("dist"));
// });

// 打包
function bundle () {
  return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true })) // buffer 同sourcemaps 的调用确保 sourcemaps正常工作
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist"))
}
gulp.task("default", ["copy-html"], bundle)
watchedBrowserify.on("update", bundle) // 监听更新
watchedBrowserify.on("log", gutil.log) // 将日志打印在控制台