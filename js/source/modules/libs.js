app.module(
    "libs",
    function(modules, name) {
        // init FastClickJS
        if ("addEventListener" in document) {
            FastClick.attach(document.body);
        }
    },
    "interactive"
);
