var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var bs = require('browser-sync');
var reload = bs.reload;
var del = require('del');
var vf  = require('vinyl-paths');
var sync = require('run-sequence');
var karma = require('karma').server;
var changelog = require('conventional-changelog');
var fs = require('fs');
var bump = require('gulp-bump');
var yargs = require('yargs');

var argv = yargs.argv,
    validBumpTypes = "major|minor|patch|prerelease".split("|"),
    Bump = (argv.bump || 'patch').toLowerCase();

if(validBumpTypes.indexOf(Bump) === -1) {
  throw new Error('Unrecognized bump "' + Bump + '".');
}

var args = { bump: Bump };

// Paths to all src files
var paths = {
  src: ['src/**/*.js'],
  dev: ['dev/index.html', 'dev/app.js', 'dev/template.html'],
  dist: './dist',
  specs: 'specs/**/*.js',
  doc: ['./docs']
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
      baseDir: ['./dev', './dist', './bower_components']
    }
  }, done);

  gulp.watch(paths.dev, reload);
  gulp.watch(paths.src, ['build', reload]);
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

gulp.task('bump-version', function(){
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump({type:args.bump })) //major|minor|patch|prerelease
    .pipe(gulp.dest('./'));
});

gulp.task('changelog', function(callback) {
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

  return changelog({
    repository: pkg.repository.url,
    version: pkg.version,
    file: './CHANGELOG.md',
    subtitle: argv.codename || ''
  }, function(err, log) {
    fs.writeFileSync('./CHANGELOG.md', log);
  });
});

gulp.task('build', ['clean'], function(done) {
  sync('lint', done);
});

gulp.task('del:change', function() {
  return gulp.src('./CHANGELOG.md')
    .pipe(vf(del));
});

gulp.task('release', function(done){
  return sync(
    'build',
    'lint',
    'bump-version',
    'del:change',
    'changelog',
    done
  );
});

gulp.task('default', ['build'], function() {
  gulp.watch(paths.src, ['lint']);
});
