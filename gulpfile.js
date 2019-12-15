var gulp = require('gulp')

// css
var cleanCSS = require('gulp-clean-css')
var postcss = require('gulp-postcss')

var sourceMaps = require("gulp-sourcemaps")
var concat = require("gulp-concat")

// browser refresh
var browserSync = require('browser-sync').create()

// images
var imagemin = require('gulp-imagemin')

// github
var ghPages = require('gh-pages')

gulp.task("css", function(){

  return gulp.src([
    "src/css/reset.css",
    "src/css/typography.css",
    "src/css/app.css",
  ])
    // initializing sourcemaps forms a bookend
    .pipe(sourceMaps.init())
    .pipe(
      postcss([
          require('autoprefixer'),
          require('postcss-preset-env')({
            stage:1,
            browsers: ['IE 11','last 2 versions']
          })
      ])
    )
    .pipe(concat("app.css"))
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
  gulp.watch("src/css/*.css", ["css"])
  // this watches for any new fonts added / removed
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/img/*", ["images"])
})

gulp.task("deploy", function(){
  ghPages.publish('dist')
})


gulp.task('default', ["html", "css", "fonts", "images", "watch"])
