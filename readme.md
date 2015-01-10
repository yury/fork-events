```
gulp.task('serve', function() {
  var server = ForkEvents.fork('.');

  server.on('started', function(e) {
    if (e.reforked) {
      browserSync.reload({ stream: false });
    } else {
      browserSync.init({
        notify: false,
        startPath: "/uikit",
        port: 8080,
        proxy: 'http://localhost:8001' // HAPI server
      });
    }
  });
});
