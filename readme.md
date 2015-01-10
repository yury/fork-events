Example of gulp serve task with fork-events instead of nodemon

```
gulp.task('serve', function() {
  var server = ForkEvents.fork('.'); // Your server script

  server.on('started', function(e) {
    if (e.reforked) {
      browserSync.reload({ stream: false });
    } else {
      browserSync.init({
        notify: false,
        port: 8080,
        proxy: 'http://localhost:8001' // HAPI server
      });
    }
  });

  gulp.watch(['ff-api/lib/controllers/**/*'], server.refork);

  gulp.watch(['ff-web/lib/assets/**/*'], ['web:assets']);
  gulp.watch(['ff-web/lib/controllers/**/*'], server.refork);
  gulp.watch(['ff-web/lib/views/**/*'], browserSync.reload);
});

```

On hapi side you just need to add 3 lines of code to start callback

```
// index.js
Glue.compose(manifest, {relativeTo: Path.join(__dirname, '.')}, function (err, server) {
  server.start(function () {

    // This 3 lines
    if (process.send) {
      process.send({event: 'started'});
    }

  });
});
```
