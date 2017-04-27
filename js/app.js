// IIFE start
(function(window) {
    "use strict";

    (function() {
        // add to global scope for ease of use
        // use global app var or create it if not present
        var app = window.app || (window.app = {}),
            counter = {
                complete: 0,
                interactive: 0
            },
            queue = {
                complete: [],
                interactive: []
            };

        // add a module to load
        app.module = function(module_name, fn, mode) {
            // determine what array the module needs to be added to
            var type = !mode || mode === "complete" ? "complete" : "interactive";
            // add the module to the queue
            queue[type].push([module_name, fn]);
        };

        // app module invoker
        var invoke = function(mode) {
            // get the queued array
            var modules = queue[mode];
            // if no modules, return
            if (!modules.length) return;
            // run the modules one after another
            // get the first module
            load(modules, counter[mode], mode);
        };

        var load = function(modules, count, mode) {
            // get the current module + its information
            var module = modules[count];
            // if no module exists all modules have loaded
            if (!module) return;
            // get the module information
            var module_name = module[0],
                fn = module[1];
            // run the module and the load() function
            (function() {
                // add the module name to the app
                app[module_name] = app[module_name] || {};
                // call the module and run it
                fn.call(app, app, module_name);
                // increase the counter
                counter[mode]++;
                // run the load function again
                load(modules, counter[mode], mode);
            })();
        };

        // cleanup the app variable
        var cleanup = function() {
            // remove unneeded properties once
            // the app has loaded
            delete app.module;
            delete app.invoke;
        };

        // https://developer.mozilla.org/en-US/docs/Web/Events/readystatechange
        // the readystatechange event is fired when the readyState attribute of a
        // document has changed
        document.onreadystatechange = function() {
            // https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
            // loading === document still loading
            // complete === document and all sub-resources have finished loading.
            // same as the window.onload event
            // interactive === document has finished loading & parsed but but
            // sub-resources such as images, stylesheets and frames are still loading
            // **Note: interactive === document.addEventListener("DOMContentLoaded",...
            // **Note: complete    === window.addEventListener("load", function() {...
            // [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)
            // [load](https://developer.mozilla.org/en-US/docs/Web/Events/load)

            // document loaded and parsed. however, still loading subresources
            // user is able to interact with page.
            if (document.readyState === "interactive") {
                // invoke the modules set to mode interactive
                invoke("interactive");
            }

            // all resources have loaded (document + subresources)
            if (document.readyState === "complete") {
                // invoke the modules set to mode complete
                invoke("complete");

                // cleanup app var once everything is loaded
                cleanup();
            }

            // good explanation with images:
            // https://varvy.com/performance/document-ready-state.html
        };
    })();

    app.module("libs", function(modules, name) {});

    app.module("globals", function(modules, name) {
        /**
         * @description [Object containing the data used to fill out the resume block sections.]
         * @type {Object}
         */
        var data = {
            bio: {
                name: "Carlos A. Gabriel",
                role: "Front-End Web Developer",
                contacts: {
                    github: ["cgabriel5", "https://github.com/cgabriel5/"],
                    linkedin: [
                        "cgabriel5",
                        "https://www.linkedin.com/in/cgabriel5/"
                    ],
                    location: ["Modesto, CA", null]
                },
                welcomeMessage: "Hello there! My name is Carlos and I am a web enthusiast. Although graduating from college with a biology degree, I had a change of heart and decided to become a web developer. Yes, I love the web that much! Having an eye for detail, I naturally found Front-End web development quite fitting. What can I say, I like it when a website looks good.",
                skills: {
                    frontend: ["HTML", "CSS", "JavaScript, jQuery"],
                    backend: ["PHP", "MySQL", "NodeJS (Socket.IO)"]
                },
                biopic: "img/default.png" // [https://www.iconfinder.com/icons/1564522/camera_capture_photo_icon#size=128]
            },
            education: {
                schools: [{
                    name: "UC Merced",
                    location: "Merced, CA",
                    degree: "Bachelor's",
                    majors: ["Biology"],
                    dates: "2015",
                    url: "http://www.ucmerced.edu/"
                }],
                onlineCourses: [{
                        title: "Front-End Web Developer Nanodegree",
                        school: "Udacity",
                        date: "2017",
                        url: "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
                    },
                    {
                        title: "Intro to Programming Nanodegree",
                        school: "Udacity",
                        date: "2016",
                        url: "https://www.udacity.com/course/intro-to-programming-nanodegree--nd000"
                    }
                ]
            },
            work: {
                jobs: [
                    // {
                    //     employer: "Google",
                    //     title: "Web Developer",
                    //     location: "Mountain View",
                    //     dates: "Jan 2010 - Future",
                    //     description: "Pellentesque euismod nisi ut lectus hendrerit," +
                    //         " interdum efficitur libero molestie."
                    // },
                    // {
                    //     employer: "Apple",
                    //     title: "Web Developer",
                    //     location: "Cupertino, CA",
                    //     dates: "2006 - Dec 31, 2009",
                    //     description: "Sed efficitur tempus bibendum. Vivamus eget ante " +
                    //         "rutrum, euismod mi accumsan, efficitur ex."
                    // }
                ]
            },
            projects: {
                // I woule rather link to the project on GitHub, for example, rather...
                // than add the any images to the resume. I feel this keeps things...
                // clear and separate.
                projects: [{
                        title: "InteractionJS (events)",
                        dates: "2017-Present",
                        description: "Small library for event handling.",
                        url: "https://github.com/cgabriel5/interactionjs"
                    },
                    {
                        title: "XHR-Wrapper (httpjs)",
                        dates: "2017-Present",
                        description: "A lightweight JavaScript XHR wrapper.",
                        url: "https://github.com/cgabriel5/httpjs"
                    },
                    {
                        title: "MonitorJS",
                        dates: "2017-Present",
                        description: "Small library that monitors an object.",
                        url: "https://github.com/cgabriel5/monitorjs"
                    },
                    {
                        title: "CSS-Syntax-Highlighter",
                        dates: "2016-Present",
                        description: "A CSS syntax highlighter.",
                        url: "https://github.com/cgabriel5/css-syntax-highlighter"
                    },
                    {
                        title: "CSS-Dupe-Finder",
                        dates: "2016-Present",
                        description: "Finds duplicate declarations within CSS code blocks.",
                        url: "https://github.com/cgabriel5/css-dupe-finder"
                    },
                    {
                        title: "Password-Generator",
                        dates: "2015-Present",
                        description: "A simple client-side password generator made in JavaScript.",
                        url: "https://github.com/cgabriel5/password-generator"
                    },
                    {
                        title: "FunnelJS",
                        dates: "2015-Present",
                        description: "Simple, standalone, lightweight JavaScript selector engine.",
                        url: "https://github.com/cgabriel5/funneljs"
                    },
                    {
                        title: "URL-Parser",
                        dates: "2015-Present",
                        description: "A JavaScript URL parser. Parses properly formatted URLs.",
                        url: "https://github.com/cgabriel5/url-parser"
                    }
                ]
            }
        };

        /**
         * @description [HTML templates used to build the resume.]
         * @type {Object}
         */
        var templates = {
            // contacts HTML
            html_contact_popup_wrapper: '<div class="none popup" id="wrapper-popup-contact"><div class="popup-close noselect"><i class="fa fa-times-circle popup-close-icon" aria-hidden="true"></i></div><ul class="ul-fix"></ul></div>',
            html_contact_button: '<button class="btn-default noselect" id="btn-contact">get in touch</button>',
            html_contact_item_generic: '<li class="popup-item"><span class="popup-label">%contact%</span> <span class="contact-lmargin-fix">%data%</span></li>',
            html_contact_item_url: '<li class="popup-item"><span class="popup-label">%contact%</span> <a href="#" class="text-blue text-link contact-lmargin-fix">%data%</a></li>',
            // bio HTML
            html_bio_wrappers: '<div class="cont-biopic none" id="wrapper-biopic"></div><div id="wrapper-name"></div><div class="cont-role" id="wrapper-role"></div><div class="cont-welcome" id="wrapper-welcome-message"></div>',
            html_biopic: '<picture><img src="%data%" alt="resume image" class="img-biopic" id="biopic"></picture>',
            html_name: '<span class="text-name" id="name">%data%</span>',
            html_role: '<span class="text-gray text-size-16" id="role">%data%</span>',
            html_message: "<span>%data%</span>",
            // item entry HTML
            html_entry: '<div class="entry"><div class="entry-left"></div><div class="entry-right"></div></div>',
            // work experience HTML
            html_workexp_start: '<div class="section-label"><span class="text-600 text-silver">EXPERIENCE</span></div>',
            html_workexp_employer: '<div class="text-600">%data%',
            html_workexp_title: " - %data%</div>",
            html_workexp_location: '<div class="text-gray">%data%</div>',
            html_workexp_generic: "<div>%data%</div>",
            // skills HTML
            html_skills_start: '<div class="section-label"><span class="text-600 text-silver">SKILLS</span></div>',
            html_skill: '<span class="tag">%data%</span>',
            html_skills_label_frontend: '<div class="text-600">Front End</div>',
            html_skills_label_backend: '<div class="text-600">Back End</div>',
            // projects HTML
            html_projects_start: '<div class="section-label"><span class="text-600 text-silver">PROJECTS</span></div>',
            html_project_name: '<div class="text-600">%data%</div>',
            html_project_generic: "<div>%data%</div>",
            html_project_link: '<div><a href="#" class="text-blue text-link">see project</a></div>',
            // traditional education HTML
            html_education_start: '<div class="section-label"><span class="text-600 text-silver">EDUCATION</span></div>',
            html_education_school_name: '<div class="text-600"><a href="#" class="text-link">%data%</a></div>',
            html_education_location: '<div class="text-gray">%data%</div>',
            html_education_generic: "<div>%data%</div>",
            html_education_degree: '<span class="text-600">%data%</span> ',
            html_education_major: '<span class="text-unbold tag">%data%</span>',
            // online class HTML
            html_education_school_name_online: '<div class="text-600">%data% <span class="class-online noselect">online</span></div>',
            html_education_generic_bold: '<div class="text-600"><a href="#" class="text-link">%data%</a></div>'
        };

        // export to access in other modules
        this[name].templates = templates;
        this[name].data = data;
    });

    app.module("utils", function(modules, name) {
        /**
         * @description [Formats provided template.]
         * @param  {String} template [The HTML template to use.]
         * @param  {String} data     [The data to plug into template.]
         * @param  {String?} url      [Optional URL used as the href.]
         * @return {String}          [Formated template with provided data. If url is provided we do
         *                            another replace to replace the 'href="#"' with the provided url.]
         */
        function format(template, data, url) {
            return template
                .replace("%data%", data)
                .replace(!url ? null : 'href="#"', !url ? null : "href=" + url + ' target="_blank"');
        }

        // /**
        //  * @description [Detects whether the device is running iOS.]
        //  * @return {Boolean}    [True if an iOS device. Otherwise, false.]
        //  * @source [http://stackoverflow.com/questions/9038625/detect-if-device-is-ios/9039885#9039885]
        //  * @source [http://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system/21742107#21742107]
        //  */
        // function is_ios() {
        //     return (
        //         /ipod|iphone|ipad/.test(navigator.userAgent.toLowerCase()) &&
        //         !window.MSStream
        //     );
        // }

        // /**
        //  * @description [Adds the CSS `fix-ios-click` if the user's device is an iOS device.]
        //  */
        // function prepare_ios() {
        //     // The click event only seems to work when the element has the CSS property `cursor: pointer`.
        //     // This is documented in the following links:
        //     // [http://stackoverflow.com/questions/3025348/how-do-i-use-jquery-for-click-event-in-iphone-web-application]
        //     // [http://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html]
        //     // [http://stackoverflow.com/questions/14795944/jquery-click-events-not-working-in-ios]
        //     // [http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html]

        //     // To fix this behavior the `fix-ios-click` CSS class is added to the portfolio_wrapper
        //     // if the device is an ip***.

        //     // add the needed CSS class if iOS
        //     if (is_ios()) {
        //         /**
        //          * @description [Creates a style element.]
        //          * @return {HTMLElement}   [The newly created element.]
        //          * @source [https://davidwalsh.name/add-rules-stylesheets]
        //          */
        //         var sheet = (function() {
        //             // create the element
        //             var style = document.createElement("style");
        //             // webkit hack :(
        //             style.appendChild(document.createTextNode(""));
        //             // add element to the page
        //             document.head.appendChild(style);
        //             // return the element
        //             return style.sheet;
        //         })();
        //         // add the rule to the CSS sheet
        //         sheet.insertRule(".fix-ios-click { cursor: pointer; }", 0);
        //         // add the class to the body
        //         document.body.classList.add("fix-ios-click");
        //     }
        // }

        // export to access in other modules
        this[name].format = format;
        // this[name].prepare_ios = prepare_ios;
    });

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

    app.module("core", function(modules, name) {
        // import whats needed
        var templates = modules.globals.templates,
            format = modules.utils.format,
            $$ = modules.$$;

        /**
         * @description [Functions that help build the resume sections and injects them into the DOM.]
         * @type {Object}
         */
        var builders = {
            /**
             * @description [Adds the bio HTML to the page.]
             * @return {Undefined} [Nothing is returned.]
             */
            bio: function() {
                // cache self reference
                var _ = this;

                //--------------------------------------------------CONTACTS

                // add contact button + its popup container
                $$.section_contacts.insertAdjacentHTML(
                    "afterbegin",
                    templates.html_contact_button +
                    templates.html_contact_popup_wrapper
                );

                // cache needed elements for ease of use, contact button + contact popup container
                var contact_btn = document.getElementById("btn-contact");
                var contact_popup = contact_btn.nextElementSibling;

                // set needed vars
                var contacts = _.contacts,
                    contact_keys = Object.keys(contacts),
                    contact_count = contact_keys.length,
                    contacts_html_string = "";

                // embed contacts if they are provided
                if (contact_count) {
                    for (var i = 0; i < contact_count; i++) {
                        var key = contact_keys[i];
                        // look only for properties on object itself
                        if (contacts.hasOwnProperty(key)) {
                            contacts_html_string += format(
                                templates[
                                    "html_contact_item_" +
                                    (!contacts[key][1] ? "generic" : "url")
                                ],
                                contacts[key][0],
                                contacts[key][1]
                            ).replace("%contact%", key);
                        }
                    }
                    contact_popup.children[1].insertAdjacentHTML(
                        "afterbegin",
                        contacts_html_string
                    );
                }

                //--------------------------------------------------CONTACTS POPUP CLICK EVENT

                // listen for click events on the DOM
                document.addEventListener("click", function(e) {
                    // cache the target + "hover" check
                    var target = e.target,
                        check = [contact_btn, contact_popup].indexOf(target) !== -1 ||
                        (contact_popup.contains(target) &&
                            // exclude the popup-close (container) & child (the icon)
                            (!target.classList.contains("popup-close") &&
                                !target.classList.contains(
                                    "popup-close-icon"
                                )));
                    // toggle button inactivity
                    contact_btn.classList[check ? "add" : "remove"]("btn-active");
                    // toggle popup container display
                    contact_popup.classList[check ? "remove" : "add"]("none");
                });

                //--------------------------------------------------BIO

                // embed biopic, name , role, message
                var section_one = $$.section_one;
                // add the bio wrappers
                section_one.insertAdjacentHTML(
                    "afterbegin",
                    templates.html_bio_wrappers
                );
                // to each wrapper add its respective data
                section_one.children[0].insertAdjacentHTML(
                    "afterbegin",
                    format(templates.html_biopic, _.biopic)
                );
                section_one.children[1].insertAdjacentHTML(
                    "afterbegin",
                    format(templates.html_name, _.name)
                );
                section_one.children[2].insertAdjacentHTML(
                    "afterbegin",
                    format(templates.html_role, _.role)
                );
                section_one.children[3].insertAdjacentHTML(
                    "afterbegin",
                    format(templates.html_message, _.welcomeMessage)
                );

                //--------------------------------------------------SKILLS

                // set needed vars
                var skills = _.skills,
                    frontend_skills = skills.frontend,
                    backend_skills = skills.backend;

                // embed skills if they are provided
                if (frontend_skills.length || backend_skills.length) {
                    // cache the skills section
                    var skills_section = $$.skills_section;
                    // add the label to the page +
                    skills_section.insertAdjacentHTML(
                        "afterbegin",
                        templates.html_skills_start
                    );

                    var add_skills = function(skills_list, label_html) {
                        /**
                            * @description Adds the provided skills onto the page.
                            * @param {array} skills_list
                            * @param {string} label_html
                            * @returns {undefined} Nothing gets returned. It just adds the given skills...
                                                   onto the page.
                            */
                        // set needed vars
                        var skills_html_string = "";
                        // add skills if provided
                        if (skills_list.length) {
                            skills_list.forEach(function(skill) {
                                skills_html_string += format(
                                    templates.html_skill,
                                    skill
                                );
                            });
                            // add the entry to the page
                            skills_section.insertAdjacentHTML(
                                "beforeend",
                                templates.html_entry
                            );
                            // get the last inserted entry
                            var entries = skills_section.getElementsByClassName(
                                "entry"
                            );
                            var last_entry = entries[entries.length - 1];
                            // left side
                            last_entry.children[0].insertAdjacentHTML(
                                "afterbegin",
                                label_html
                            );
                            // right side
                            last_entry.children[1].insertAdjacentHTML(
                                "afterbegin",
                                skills_html_string
                            );
                        }
                    };

                    // add skills
                    add_skills(
                        frontend_skills,
                        templates.html_skills_label_frontend
                    );
                    add_skills(backend_skills, templates.html_skills_label_backend);
                }
            },
            /**
             * @description [Adds the education HTML to the page.]
             * @return {Undefined} [Nothing is returned.]
             */
            education: function() {
                // cache the education section
                var education_section = $$.education_section;

                // add the label to the page
                education_section.insertAdjacentHTML(
                    "afterbegin",
                    templates.html_education_start
                );

                //--------------------------------------------------ONLINE-SCHOOL

                // loop through online school objects and add them to the page
                this.onlineCourses.forEach(function(online_course) {
                    // add the entry to the page
                    education_section.insertAdjacentHTML(
                        "beforeend",
                        templates.html_entry
                    );
                    // get the last inserted entry
                    var entries = education_section.getElementsByClassName("entry");
                    var last_entry = entries[entries.length - 1];
                    // left side
                    last_entry.children[0].insertAdjacentHTML(
                        "afterbegin",
                        format(
                            templates.html_education_school_name_online,
                            online_course.school
                        ) +
                        format(
                            templates.html_education_generic,
                            online_course.date
                        )
                    );
                    // right side
                    last_entry.children[1].insertAdjacentHTML(
                        "afterbegin",
                        format(
                            templates.html_education_generic_bold,
                            online_course.title,
                            online_course.url
                        )
                    );
                });

                //--------------------------------------------------TRADITIONAL-SCHOOL

                // loop through school objects and add them to the page
                this.schools.forEach(function(school) {
                    // add the entry to the page
                    education_section.insertAdjacentHTML(
                        "beforeend",
                        templates.html_entry
                    );
                    // get the last inserted entry
                    var entries = education_section.getElementsByClassName("entry");
                    var last_entry = entries[entries.length - 1];
                    // set needed vars
                    var majors = school.majors,
                        majors_html_string = "";
                    // build majors HTML
                    majors.forEach(function(major) {
                        majors_html_string += format(
                            templates.html_education_major,
                            major
                        );
                    });
                    // left side
                    last_entry.children[0].insertAdjacentHTML(
                        "afterbegin",
                        format(
                            templates.html_education_school_name,
                            school.name,
                            school.url
                        ) +
                        format(
                            templates.html_education_location,
                            school.location
                        ) +
                        format(templates.html_education_generic, school.dates)
                    );
                    // right side
                    last_entry.children[1].insertAdjacentHTML(
                        "afterbegin",
                        format(templates.html_education_degree, school.degree) +
                        majors_html_string
                    );
                });
            },
            /**
             * @description [Adds the work HTML to the page.]
             * @return {Undefined} [Nothing is returned.]
             */
            work: function() {
                //--------------------------------------------------JOBS

                // cache the work experience section
                var workexp_section = $$.workexp_section;

                // if no jobs return and hide the section
                if (!this.jobs.length) workexp_section.classList.add("none");

                // add the label to the page
                workexp_section.insertAdjacentHTML(
                    "afterbegin",
                    templates.html_workexp_start
                );

                // loop through jobs objects and add them to the page
                this.jobs.forEach(function(job) {
                    // add the entry to the page
                    workexp_section.insertAdjacentHTML(
                        "beforeend",
                        templates.html_entry
                    );
                    // get the last inserted entry
                    var entries = workexp_section.getElementsByClassName("entry");
                    var last_entry = entries[entries.length - 1];
                    // left side
                    last_entry.children[0].insertAdjacentHTML(
                        "afterbegin",
                        format(templates.html_workexp_employer, job.employer) +
                        format(templates.html_workexp_title, job.title) +
                        format(templates.html_workexp_location, job.location) +
                        format(templates.html_workexp_generic, job.dates)
                    );
                    // right side
                    last_entry.children[1].insertAdjacentHTML(
                        "afterbegin",
                        format(templates.html_workexp_generic, job.description)
                    );
                });
            },
            /**
             * @description [Adds the projects HTML to the page.]
             * @return {Undefined} [Nothing is returned.]
             */
            projects: function() {
                //--------------------------------------------------PROJECTS

                // cache the workExperience section
                var projects_section = $$.projects_section;

                // add the label to the page
                projects_section.insertAdjacentHTML(
                    "afterbegin",
                    templates.html_projects_start
                );

                // loop through projects objects and add them to the page
                this.projects.forEach(function(project) {
                    // add the entry to the page
                    projects_section.insertAdjacentHTML(
                        "beforeend",
                        templates.html_entry
                    );
                    // get the last inserted entry
                    var entries = projects_section.getElementsByClassName("entry");
                    var last_entry = entries[entries.length - 1];
                    // left side
                    last_entry.children[0].insertAdjacentHTML(
                        "afterbegin",
                        format(templates.html_project_name, project.title) +
                        format(templates.html_project_generic, project.dates) +
                        format(templates.html_project_link, "", project.url)
                    );
                    // right side
                    last_entry.children[1].insertAdjacentHTML(
                        "afterbegin",
                        format(templates.html_project_generic, project.description)
                    );
                });
            }
        };

        // export to access in other modules
        this[name].builders = builders;
    });

    app.module("events", function(modules, name) {});

    app.module("main", function(modules, name) {
        // grab modules
        var globals = modules.globals,
            utils = modules.utils,
            core = modules.core;
        // get needed functions/data
        // var prepare_ios = utils.prepare_ios,
        var builders = core.builders,
            data = globals.data;

        // invoke builders
        ["bio", "work", "projects", "education"].forEach(function(section) {
            builders[section].call(data[section]);
        });

        // prepare for iOS devices
        // prepare_ios();
    });

    // IIFE end
})(window);