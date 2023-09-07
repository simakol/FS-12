import gulp from "gulp";
import gulpSass from "gulp-sass";
import browserSync from "browser-sync";
import * as dartSass from "sass";

const sass = gulpSass(dartSass);
const browserSyncObj = browserSync.create();

gulp.task("sass", function (done) {
  gulp
    .src("./src/styles/**/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("./src/styles/css"))
    .pipe(browserSyncObj.stream());

  done();
});

gulp.task("serve", function (done) {
  browserSyncObj.init({
    server: "./src/",
    port: 3000,
  });

  gulp.watch("./src/styles/**/*.scss", gulp.series("sass"));
  gulp.watch("./src/*.html").on("change", () => {
    browserSync.reload();
    done();
  });
  done();
});

gulp.task("default", gulp.series("sass", "serve"));
