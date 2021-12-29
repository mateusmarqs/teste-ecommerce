const { task, parallel, series } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer')
var uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();


// Função para compilar Sass
const compileSass = () => {
  return gulp
    .src('./src/assets/css/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(
      autoprefixer({
        cascade: false
      }))
    .pipe(gulp.dest('./dist/assets/css/'))
    .pipe(browserSync.stream());
};

// Função para comprimir javascript
const compressJs = () => {
  return gulp 
    .src('./src/assets/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js/'))
    .pipe(browserSync.stream());
};

// Função para comprimir HTML
const compressHTML = () => {
  return gulp
  .src('./src/*.html')
  .pipe(htmlmin( { collapseWhitespace: true } ))
  .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.stream());
}

// Função para mover imagens
const moveImgs = () => {
  return gulp
  .src('./src/assets/imgs/**/*.*')
  .pipe(gulp.dest('./dist/assets/imgs/'))
  .pipe(browserSync.stream());
}

// Função para iniciar o browser
const browser = () => {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
}

// Função de watch
const watch = () => {
  gulp.watch('./src/assets/css/**/*.scss', compileSass)
  gulp.watch('./src/assets/js/**/*.js', compressJs)
  gulp.watch('./src/assets/img/**/*.*', moveImgs)
  gulp.watch('./src/*.html', compressHTML)
}

gulp.task('execution', parallel(browser, watch))
gulp.task('sass', compileSass)
gulp.task('compressJs', compressJs)
gulp.task('moveImgs', moveImgs)
gulp.task('compressHTML', compressHTML)

gulp.task('default', gulp.series('sass', 'moveImgs', 'compressJs', 'compressHTML',  'execution'))