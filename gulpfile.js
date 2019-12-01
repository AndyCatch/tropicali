var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCSS = require('gulp-clean-css')
var sourceMaps = require("gulp-sourcemaps")

var browserSync = require('browser-sync').create()

var imagemin = require('gulp-imagemin')

var ghPages = require('gh-pages')

sass.compiler = require('node-sass')

gulp.task("sass", function(){
  // we want to run "sass css/app.scss app.css --watch"
  return gulp.src("src/css/app.scss")
    // initializing sourcemaps forms a bookend
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(
      cleanCSS({
         compatibility: 'ie8' 
      })
    )
    // 
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())
})

// we need to push our output to the right file
gulp.task("html", function(){
  //  using "*.html" ensures that any html file will be piped
  return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function(){
  return gulp.src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function(){
  return gulp.src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
})

gulp.task("watch", function(){

  browserSync.init(
    {server:
      { 
        baseDir:"dist"
  }
})

  gulp.watch("src/*.html", ["html"]).on("change", browserSync.reload)

  // we want to set Gulp to watch for the change in the .scss file
  gulp.watch("src/css/app.scss", ["sass"])
  // this watches for any new fonts added / removed
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/img/*", ["images"])
})

gulp.task("deploy", function(){
  ghPages.publish('dist')
})


gulp.task('default', ["html", "sass", "fonts", "images", "watch"])
