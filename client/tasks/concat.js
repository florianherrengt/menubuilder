import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';

const src = [ 
    'app/app.js', 
    'app/components/**/*.js',
    'app/directives/**/*.js',
    '!**/*.test.*'
];

gulp.task('js', () => {
    gulp.watch(src, ['js']);
    return gulp.src(src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/dist'));
});
