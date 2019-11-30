var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task("sass", function(){
  // Sass bit
  // we want to run "sass css/app.scss app.css --watch"

  return gulp.src("css/app.scss")
    .pipe(sass())
    .pipe(gulp.dest("."))
})

gulp.task("watch", function(){
  // we want to set Gulp to watch for the change in the .scss file
  gulp.watch("css/app.scss", ["sass"])
})




gulp.task('default', ["sass"]);
