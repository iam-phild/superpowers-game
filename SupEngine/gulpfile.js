var gulp = require("gulp");

// TypeScript
var ts = require("gulp-typescript");
gulp.task("typescript", function() {
  var tsResult = gulp.src([ "**/*.ts", "!node_modules/**" ]).pipe(ts({
    typescript: require("typescript"),
    declarationFiles: false,
    noImplicitAny: true,
    module: "commonjs",
    target: "ES5"
  }));
  return tsResult.js.pipe(gulp.dest("./"));
});

// Browserify
var browserify = require("browserify");
var source = require("vinyl-source-stream");
gulp.task("browserify", [ "typescript" ], function() {
  var bundler = browserify("./SupEngine.js", { standalone: "SupEngine" } );
  function bundle() { return bundler.bundle().pipe(source("SupEngine.js")).pipe(gulp.dest("../../public/system")); };
  return bundle();
});

// All
gulp.task("default", [ "typescript", "browserify" ]);