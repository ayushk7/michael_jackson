var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var babel = require("gulp-babel");
var path = require("path")
gulp.task('gulp_nodemon', function() {
  nodemon({
    script: './server', //this is where my express server is
    ext: 'js html css', //nodemon watches *.js, *.html and *.css files
    env: { 'NODE_ENV': 'development' }
  });
});

const compileJSX = () => {
  return gulp.src("src/**/*.jsx")
  .pipe(babel({
    presets: ["@babel/preset-react"]
  }))
  .pipe(gulp.dest(path.join(__dirname, "dist")));
}

gulp.task("compile", function () {
  gulp.watch(['./**/*.jsx']).on("change", compileJSX);
});

gulp.task('sync', function() {
  browserSync.init({
    port: 4000, // this port will show our app
    proxy: 'http://localhost:5000/', //this is the port where express server works
    ui: { port: 3003 }, //UI, can be any port
    reloadDelay: 1000 //Important, otherwise syncing will not work
  });
  gulp.watch(['./**/*.js', './**/*.html', './**/*.css']).on("change", browserSync.reload);
});

exports.watch = gulp.parallel(["compile", "gulp_nodemon", "sync"]);