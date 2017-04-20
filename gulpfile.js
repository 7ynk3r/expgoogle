var gulp = require('gulp');
var bump = require('gulp-bump');
var jeditor = require("gulp-json-editor");
var exec = require('child_process').exec;
var download = require("gulp-download");

function getBuildUrlAsync() {
  return new Promise(function(resolve, reject) {
    console.log('checking build status...')
    exec("exp bs", function (err, stdout, stderr) {
      if (err) {
        reject(err);
      }
      else {
        var regex = /https:\/\/[^[ \n]+/; // any url
        var url = (stdout.match(regex)||[])[0];
        if (!url) {
          resolve(getBuildUrlAsync());
        }
        else {
          resolve(url);
        }
      }
    });
  });
}

gulp.task('bumpBuild', function(cb){
  gulp.src('./exp.json')
  .pipe(jeditor(function(json) {
    json.ios.buildNumber++;
    json.android.versionCode++;
    return json;
  }))
  .pipe(gulp.dest('./'))
  .on('end', cb);
});

gulp.task('bumpPatch', ['bumpBuild'], function(cb){
  gulp.src(['./exp.json', './package.json'])
  .pipe(bump())
  .pipe(gulp.dest('./'))
  .on('end', cb);
});

gulp.task('downloadBuild', function (cb) {
  getBuildUrlAsync().then(url => {
    console.log('downloading ', url);
    download(url)
  	 .pipe(gulp.dest("build/"))
     .on('end', cb);
  }).catch(cb);
})
