const gulp = require("gulp");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();

const path = {
  styles: {
    in: "src/dev/sass/**/*.sass",
    out: "src/dist/css"
  },
  scripts: {
    in: "src/dev/js/**/*.js",
    out: "src/dist/js"
  },
  html: {
    in: "src/**/*.html"
  }
}

browserSync.init({
  server: { baseDir: "./src" }
})

let html = () =>
  gulp.src(path.html.in).pipe(browserSync.stream());

let styles = () => 
  gulp.src(path.styles.in)
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest(path.styles.out))
    .pipe(browserSync.stream());

let scripts = () =>
  gulp.src(path.scripts.in)
    .pipe(babel({presets: ["@babel/env"]}))
    .pipe(uglify())
    .pipe(gulp.dest(path.scripts.out))
    .pipe(browserSync.stream());

let watch = () => {
  gulp.watch(path.html.in, html);
  gulp.watch(path.styles.in, styles);
  gulp.watch(path.scripts.in, scripts);
}

exports.default = gulp.series(html, styles, scripts, watch);