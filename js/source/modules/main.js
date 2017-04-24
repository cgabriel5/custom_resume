app.module("main", function(modules, name) {
    // grab modules
    var globals = modules.globals, utils = modules.utils, core = modules.core;
    // get needed functions/data
    var prepare_ios = utils.prepare_ios,
        builders = core.builders,
        data = globals.data;

    // invoke builders
    ["bio", "work", "projects", "education"].forEach(function(section) {
        builders[section].call(data[section]);
    });

    // prepare for iOS devices
    prepare_ios();
});
