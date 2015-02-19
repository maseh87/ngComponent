var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var bs = require('browser-sync');
var reload = bs.reload;
var del = require('del');
var vf  = require('vinyl-paths');
var sync = require('run-sequence');
var karma = require('karma').server;
// Paths to all src files
var paths = {
  src: ['src/**/*.js'],
  dev: ['dev/index.html', 'dev/app.js'],
  dist: './dist',
  specs: 'specs/**/*.js'
};

// lint the coffee
gulp.task('lint', function() {
  return gulp.src(paths.src)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.ngAnnotate())
    // .pipe($.uglify())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('clean', function() {
  return gulp.src([paths.dist + '/**/*.**'])
    .pipe(vf(del));
});


// run dev env for visually inspecting the plugin
gulp.task('dev', ['build'], function(done) {
  bs({
    port: 9500,
    server: {
      baseDir: ['./dev', './dist']
    }
  }, done);

  gulp.watch(paths.dev, reload);
});

// run karma test
gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

// for ci, use phantom
gulp.task('test:ci', function(done){
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: ['PhantomJS']
  }, done);
});

gulp.task('travis', function(done) {
  sync('build', 'test:ci', done);
});

// generate docs from our comments
gulp.task('docs', function() {

});

gulp.task('build', ['clean'], function(done) {
  sync('lint', done);
});

gulp.task('default', ['build'], function() {
  gulp.watch(paths.src, ['lint']);
});
// bump versions in our pckg.json and bower.json
gulp.task('bump', function() {

});
