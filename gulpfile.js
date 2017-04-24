// nodejs included plugins
var os = require("os"), path = require("path");

// third-party plugins
var $ = require("gulp-load-plugins")({
    pattern: ["*"],
    rename: { autoprefixer: "ap" }
}),
    gulp = $.gulp,
    sequence = $.runSequence,
    mds = $.markdownStyles,
    open = $.opn,
    del = $.del,
    bs = $.browserSync,
    plumber = $.plumber;

// create the browser-sync servers
var bs1 = bs.create("localhost"),
    bs2 = bs.create("readme"),
    port1 = 3000,
    port2 = 3002;

// browsers to open index.html/markdown preview in
var browsers = ["google-chrome"]; // , "firefox"];

/**
 * @description [Builds the localhost URL dynamically.]
 * @param  {String} path [The gulpfile's file path.]
 * @return {String}      [The localhost URL.]
 */
var uri = function(filename, port) {
    // remove everything until /htdocs/, append the provided filename, & return
    return (
        "http://" +
        __dirname.replace(
            /^.+\/htdocs\//,
            "localhost" + (port ? ":" + port : "") + "/"
        ) +
        (filename ? "/" + filename : "")
    );
};

/**
 * @description [Create an OS notification.]
 * @param  {String} message [The notification message.]
 */
var notify = function(message, error) {
    // ubuntu
    // var notification = new notifier();
    // notification.notify({});

    // determine what image to show
    var image = (!error ? "success" : "error") + "_256.png";

    // OS agnostic
    $.nodeNotifier.notify({
        title: "Gulp",
        message: message,
        icon: path.join(__dirname, "source/assets/node-notifier/" + image),
        // time: 1000,
        // urgency: "critical",
        sound: true
    });
};

// tasks
// init HTML files + minify
gulp.task("html", function(done) {
    return gulp
        .src(
            [
                "index.top.html",
                "head/start.html",
                "head/meta.html",
                "head/css.html",
                "head/js.html",
                "head/end.html",
                "body/start.html",
                "body/content.html",
                "body/js.html",
                "body/end.html",
                "index.end.html"
            ],
            { cwd: "html/source/" }
        )
        .pipe(
            plumber({
                errorHandler: function(error) {
                    // [https://scotch.io/tutorials/prevent-errors-from-crashing-gulp-watch]
                    // [https://cameronspear.com/blog/how-to-handle-gulp-watch-errors-with-plumber/]
                    // [http://blog.ibangspacebar.com/handling-errors-with-gulp-watch-and-gulp-plumber/]
                    notify("Error with `HTML` task.", true);
                    this.emit("end");
                }
            })
        )
        .pipe($.concat("index.html"))
        .pipe(
            $.jsbeautifier({
                brace_style: "collapse",
                end_with_newline: false,
                indent_char: " ",
                indent_handlebars: false,
                indent_inner_html: false,
                indent_scripts: "keep",
                indent_size: 4,
                max_preserve_newlines: 0,
                preserve_newlines: true,
                wrap_line_length: 0
            })
        )
        .pipe(gulp.dest("./"))
        .pipe($.minifyHtml())
        .pipe(gulp.dest("dist/"))
        .pipe(bs1.stream());
});

// build app.css + autoprefix + minify
gulp.task("css", function(done) {
    return gulp
        .src(["normalize.css", "base.css", "styles.css"], {
            cwd: "css/source/"
        })
        .pipe(
            plumber({
                errorHandler: function(error) {
                    // [https://scotch.io/tutorials/prevent-errors-from-crashing-gulp-watch]
                    // [https://cameronspear.com/blog/how-to-handle-gulp-watch-errors-with-plumber/]
                    // [http://blog.ibangspacebar.com/handling-errors-with-gulp-watch-and-gulp-plumber/]
                    notify("Error with `CSS` task.", true);
                    this.emit("end");
                }
            })
        )
        .pipe($.concat("app.css"))
        .pipe(gulp.dest("css/")) // dump into development folder
        .pipe(
            $.autoprefixer({
                // from google web starter kit
                browsers: [
                    "ie >= 10",
                    "ie_mob >= 10",
                    "ff >= 30",
                    "chrome >= 34",
                    "safari >= 7",
                    "opera >= 23",
                    "ios >= 7",
                    "android >= 4.4",
                    "bb >= 10"
                ],
                cascade: false
            })
        )
        .pipe($.cleanCss()) // minify for production
        .pipe(gulp.dest("dist/css/")) // dump in dist/ folder
        .pipe(bs1.stream());
});

// build app.js + minify + beautify
gulp.task("jsapp", function(done) {
    return gulp
        .src(
            [
                // get all the source build files
                "app.iife.top.js",
                "app.init.js",
                // start: app modules loaded in the
                // sequence they are provided
                "modules/libs.js",
                "modules/globals.js",
                "modules/utils.js",
                "modules/$$.js",
                "modules/core.js",
                "modules/events.js",
                "modules/main.js",
                // end: app modules
                "app.iife.end.js"
            ],
            { cwd: "js/source/" }
        )
        .pipe(
            plumber({
                errorHandler: function(error) {
                    // [https://scotch.io/tutorials/prevent-errors-from-crashing-gulp-watch]
                    // [https://cameronspear.com/blog/how-to-handle-gulp-watch-errors-with-plumber/]
                    // [http://blog.ibangspacebar.com/handling-errors-with-gulp-watch-and-gulp-plumber/]
                    notify("Error with `JSAPP` task.", true);
                    this.emit("end");
                }
            })
        )
        .pipe($.concat("app.js"))
        .pipe($.jsbeautifier())
        .pipe(gulp.dest("js/")) // dump into development folder
        .pipe($.uglify()) // minify for production
        .pipe(gulp.dest("dist/js/")) // dump in dist/ folder
        .pipe(bs1.stream());
});

// build libs.js + minify + beautify
gulp.task("jslibs", function(done) {
    return gulp
        .src(
            [
                // add any used js library paths here
                // "js/libs/jquery.js"
                // "js/libs/modernizr.js"
            ]
        )
        .pipe(
            plumber({
                errorHandler: function(error) {
                    // [https://scotch.io/tutorials/prevent-errors-from-crashing-gulp-watch]
                    // [https://cameronspear.com/blog/how-to-handle-gulp-watch-errors-with-plumber/]
                    // [http://blog.ibangspacebar.com/handling-errors-with-gulp-watch-and-gulp-plumber/]
                    notify("Error with `JSLIBS` task.", true);
                    this.emit("end");
                }
            })
        )
        .pipe($.concat("libs.js"))
        .pipe($.jsbeautifier())
        .pipe(gulp.dest("js/")) // dump into development folder
        .pipe($.uglify()) // minify for production
        .pipe(gulp.dest("dist/js/")) // dump in dist/ folder
        .pipe(bs1.stream());
});

// copy img/ to dist/img/
gulp.task("img", function(done) {
    // deed to copy hidden files/folders? [https://github.com/klaascuvelier/gulp-copy/issues/5]
    return gulp
        .src("img/**")
        .pipe(
            plumber({
                errorHandler: function(error) {
                    // [https://scotch.io/tutorials/prevent-errors-from-crashing-gulp-watch]
                    // [https://cameronspear.com/blog/how-to-handle-gulp-watch-errors-with-plumber/]
                    // [http://blog.ibangspacebar.com/handling-errors-with-gulp-watch-and-gulp-plumber/]
                    notify("Error with `IMG` task.", true);
                    this.emit("end");
                }
            })
        )
        .pipe(gulp.dest("dist/img/")) // dump in dist/ folder
        .pipe(bs1.stream());
});

// markdown to html (with github style/layout)
gulp.task("readme", function() {
    mds.render(
        mds.resolveArgs({
            input: path.normalize(process.cwd() + "/README.md"),
            output: path.normalize(process.cwd() + "/markdown/preview"),
            layout: path.normalize(
                process.cwd() + "/markdown/source"
                // process.cwd() + "/node_modules/markdown-styles/layouts/github"
            )
        })
        // function() {} // potential callback
    );
});

// watch changes to files
gulp.task("watch", function(done) {
    // start browser-syncs
    bs1.init({
        browser: browsers,
        proxy: uri(),
        port: port1,
        ui: { port: port1 + 1 },
        notify: false
    });
    bs2.init({
        browser: browsers,
        proxy: uri("markdown/preview/README.html"),
        port: port2,
        ui: { port: port2 + 1 },
        notify: false,
        open: false
    });

    // gulp.watch options
    var options = { /*debounceDelay: 2000,*/ cwd: "./" };

    gulp.watch(
        ["i*.html", "head/*.html", "body/*.html"],
        { cwd: "html/source/" },
        function() {
            return sequence("html");
        }
    );
    gulp.watch(["css/source/*.css"], options, function() {
        return sequence("css");
    });
    gulp.watch(
        ["libs/*.js", "source/*.js", "source/modules/*.js"],
        { cwd: "js/" },
        function() {
            return sequence("jsapp", "jslibs");
        }
    );
    gulp.watch(["img/**"], options, function() {
        return sequence("img");
    });
    gulp.watch(["README.md"], options, function() {
        return sequence("readme", function() {
            bs2.reload();
        });
    });
});

// command line gulp task names

// open index.html in browser
gulp.task("open-index", function(done) {
    open(uri(null, port1), {
        app: browsers
    }); // .then(function() {});
    done();
});

// open README.md HTML preview in browser
gulp.task("open-md", function(done) {
    open(uri("markdown/preview/README.html", port2), {
        app: browsers
    }); // .then(function() {});
    done();
});

// reset the parent folder to its original status
gulp.task("reset", function(done) {
    // remove the dist directory
    return del(
        [
            "./**", // select all files but keep the following...
            "!.", // keep the parent directory
            // keep the source/ and node_modules/ directories
            // and the gulpfile + package.json files.
            "!./source",
            "!./source/**",
            "!./node_modules",
            "!./node_modules/**",
            "!./gulpfile.js",
            "!./package.json"
        ],
        {
            force: true
            // dryRun: true
        }
    )
        .then(function(paths) {
            // once everything but the source/ and node_modules/ directories
            // are deleted we copy the source/ folder contents into the root
            // directory.
            return gulp
                .src(["./source/**"], {
                    dot: true // copy dot files as well
                })
                .pipe(
                    plumber({
                        errorHandler: function(error) {
                            // [https://scotch.io/tutorials/prevent-errors-from-crashing-gulp-watch]
                            // [https://cameronspear.com/blog/how-to-handle-gulp-watch-errors-with-plumber/]
                            // [http://blog.ibangspacebar.com/handling-errors-with-gulp-watch-and-gulp-plumber/]
                            notify("Error with `RESET` task.", true);
                            this.emit("end");
                        }
                    })
                )
                .pipe(gulp.dest("./"));
        })
        .then(function() {
            notify("Reset complete");
        });
});

// build the dist/ folder
gulp.task("build", function(done) {
    return sequence(
        "css",
        "jsapp",
        "jslibs",
        "img",
        "html",
        "readme",
        function() {
            notify("Build complete");
            done();
        }
    );
});

// gulps default task is set to rum the build + watch + browser-sync
gulp.task("default", function(done) {
    return sequence("build", function() {
        sequence("watch");
        done();
    });
});
