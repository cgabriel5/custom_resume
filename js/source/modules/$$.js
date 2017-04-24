app.module("$$", function(modules, name) {
    // cache vars
    var d = document,
        $ = function(id) {
            return d.getElementById(id);
        };
    // export to access in other modules
    this[name]["section_contacts"] = $("section-contacts");
    this[name]["section_one"] = $("section-bio");
    this[name]["skills_section"] = $("section-skills");
    this[name]["education_section"] = $("section-education");
    this[name]["workexp_section"] = $("section-workexp");
    this[name]["projects_section"] = $("section-projects");
});
