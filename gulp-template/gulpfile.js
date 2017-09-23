var
    gulp         = require('gulp'),                        // Подключаем Gulp
    sass         = require('gulp-sass'),                   // Подключаем Sass пакет
    sourcemaps   = require('gulp-sourcemaps'),             // Плагин для генерации css sourscemaps, которые будут помогать при отладке кода
    browserSync  = require('browser-sync'),                // Плагин поможет легко развернуть локальный dev сервер с блэкджеком и livereload, а так же с его помощью мы сможем сделать тунель на наш localhost, что бы легко демонстрировать верстку заказчику
    concat       = require('gulp-concat'),                 // Плагин для того, чтобы !не! подключать зависимости в отдельных тегах <script> на странице, а объединить их в один файл!!!!
    cssnano      = require('gulp-cssnano'),                // Пакет для минификации CSS
    rename       = require('gulp-rename'),                 // Библиотеку для переименования файлов
    autoprefixer = require('gulp-autoprefixer'),           // Плагин автоматически добавляет вендорные префиксы к CSS свойствам
    uglify       = require('gulp-uglify'),                 // Плагин для сжатия JS
    babel        = require('gulp-babel'),                  // Babel is a JavaScript compiler
    imagemin     = require('gulp-imagemin');               // Подключаем библиотеку для работы с изображениями

gulp.task('sass', function () { // Создаем таск Sass
    return gulp.src('app/sass/style.scss') // Источник
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
    return gulp.src(['node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js', 'app/js/common.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('app/js/'));
});

gulp.task('DeployScripts', function () {
    return gulp.src('all.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('app/js/'));
});

gulp.task('css-libs', function () {
    return gulp.src('app/css/style.css')
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(cssnano())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('image', function () {
    gulp.src('app/img/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('app/img'));
});


gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('build', ['css-libs', 'deployScripts']);

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('app/sass/*.scss', ['sass']);  // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/*.js', ['scripts']); // Наблюдение за JS файлами в папке js
});
