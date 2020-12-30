const gulp = require("gulp");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const path = {
  styles: {
    in: "dev/styles/**/*.scss",
    out: "assets/styles"
  },
  scripts: {
    in: "dev/scripts/**/*.js",
    out: "assets/scripts"
  }
};

const styles = () => {
  return gulp.src(path.styles.in)
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest(path.styles.out));
}

const scripts = () => {
  return gulp.src(path.scripts.in)
    .pipe(babel({presets: ["@babel/env"]}))
    .pipe(uglify())
    .pipe(gulp.dest(path.scripts.out));
}

const watch = () => {
  gulp.watch(path.styles.in, styles);
  gulp.watch(path.scripts.in, scripts);
}

exports.default = gulp.series(styles, scripts, watch);