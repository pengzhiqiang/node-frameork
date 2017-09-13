var gulp = require("gulp");
var webpack = require("gulp-webpack");
var path = require("path");
var less = require("gulp-less");
var sass = require("gulp-sass");
var rev = require("gulp-rev");
var jsminify = require("gulp-minify");
var clean = require("gulp-clean");
var gulpsync = require('gulp-sync')(gulp);

//js
gulp.task('webpack', function(next) {
    gulp.src('js/*.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('../public/js'))
        .pipe(rev())
        .pipe(gulp.dest('../public/js'))
        .pipe(jsminify())
        .pipe(gulp.dest('../public/js'))
        .pipe(rev.manifest("manifest-js.json"))
        .pipe(gulp.dest('../public/rev'));
    next();
});

//css
gulp.task('less', function() {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest("../public/css"))
        .pipe(rev())
        .pipe(gulp.dest("../public/css"))
        .pipe(rev.manifest("manifest-css.json"))
        .pipe(gulp.dest('../public/rev'));
});

//watchjs
gulp.task("watchjs", function() {
    gulp.watch("js/*.js").on("change", function(event) {
        var curPath = path.parse(event.path);
        gulp.src(event.path)
            .pipe(webpack({
                entry: event.path,
                output: {
                    filename: curPath.name + curPath.ext
                },

            }))
            .pipe(gulp.dest('../public/js'));
    });
});

//watchcss
gulp.task("watchcss", function() {
    gulp.watch(["less/*.less", "less/*.sass"]).on("change", function(event) {
        var curPath = path.parse(event.path);
        if (curPath.ext == ".less") {
            gulp.src(event.path)
                .pipe(less())
                .pipe(gulp.dest("../public/css"));
        } else if (curPath.ext == ".sass") {
            gulp.src(event.path)
                .pipe(sass().on('error', sass.logError))
                .pipe(gulp.dest("../public/css"));
        }
    });
});

//开发构建
gulp.task("watch", ["watchjs", "watchcss"], function() {});

gulp.task("clean", function(next) {
    gulp.src("js/temp/*.js")
        .pipe(clean());
    next();
});

//正式构建
gulp.task("dev", ["less", "webpack"]);
