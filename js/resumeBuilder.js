document.onreadystatechange = function() {

    "use strict";

    //--------------------------------------------------iOS Detection

    /**
     * @description [Detects whether the device is running iOS.]
     * @return {Boolean}    [True if an iOS device. Otherwise, false.]
     * @source [http://stackoverflow.com/questions/9038625/detect-if-device-is-ios/9039885#9039885]
     * @source [http://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system/21742107#21742107]
     */
    function is_ios() {
        return ((/ipod|iphone|ipad/).test(navigator.userAgent.toLowerCase()) && !window.MSStream);
    }

    /**
     * @description [Adds the CSS `ios-click-fix` if the user's device is an iOS device.]
     */
    function prepare_ios() {
        // The click event only seems to work when the element has the CSS property `cursor: pointer`.
        // This is documented in the following links:
        // [http://stackoverflow.com/questions/3025348/how-do-i-use-jquery-for-click-event-in-iphone-web-application]
        // [http://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html]
        // [http://stackoverflow.com/questions/14795944/jquery-click-events-not-working-in-ios]
        // [http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html]

        // To fix this behavior the `ios-click-fix` CSS class is added to the portfolio_wrapper
        // if the device is an ip***.

        // add the needed CSS class
        if (is_ios()) portfolio_wrapper.classList.add("ios-click-fix");
    }

    // all resources have loaded
    if (document.readyState == "complete") {

        // JSON objects
        // ----------------------------------BIO Object
        var bio = {
            "name": "John Doe",
            "role": "a web developer",
            "contacts": {
                "mobile": "650-555-5555",
                "email": "johndoe@example.com",
                "github": "johndoe",
                "twitter": "@johndoe",
                "location": "San Francisco, CA"
            },
            "welcomeMessage": "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
                " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "skills": {
                "frontend": ["HTML", "CSS", "JavaScript, jQuery"],
                "backend": ["PHP", "Python", "MySQL", "NodeJS (Socket.IO)"]
            },
            "biopic": "images/fry.jpg",
            "display": function() {
                /**
                 * @description Adds the bio HTML to the page.
                 */
                // cache self reference
                var THIS = this;

                //--------------------------------------------------CONTACTS

                // add contact button + its popup container
                document
                    .getElementById("section-contacts")
                    .insertAdjacentHTML("afterbegin", html_contact_button + html_contact_popup_wrapper);

                // cache needed elements for ease of use, contact button + contact popup container
                var contact_btn = document.getElementById("btn-contact");
                var contact_popup = contact_btn.nextElementSibling;

                // set needed vars
                var contacts = THIS.contacts,
                    contact_keys = Object.keys(contacts),
                    contact_count = contact_keys.length,
                    contacts_html_string = "";

                // embed contacts if they are provided
                if (contact_count) {
                    for (var i = 0; i < contact_count; i++) {
                        var key = contact_keys[i];
                        // look only for properties on object itself
                        if (contacts.hasOwnProperty(key)) {
                            contacts_html_string += format(html_contact_item_generic, contacts[key])
                                .replace("%contact%", key);
                        }
                    }
                    contact_popup.children[0].insertAdjacentHTML("afterbegin", contacts_html_string);
                }

                //--------------------------------------------------CONTACTS POPUP CLICK EVENT

                // listen for click events on the DOM
                document.addEventListener("click", function(e) {
                    // cache the target + "hover" check
                    var target = e.target,
                        check = ([contact_btn, contact_popup].indexOf(target) !== -1 || contact_popup.contains(target));
                    // toggle button inactivity
                    contact_btn.classList[check ? "add" : "remove"]("btn-active");
                    // toggle popup container display
                    contact_popup.classList[check ? "remove" : "add"]("none");
                });

                //--------------------------------------------------BIO

                // embed biopic, name , role, message
                var section_one = document.getElementById("section-bio");
                // add the bio wrappers
                section_one.insertAdjacentHTML("afterbegin", html_bio_wrappers);
                // to each wrapper add its respective data
                section_one.children[0].insertAdjacentHTML("afterbegin", format(html_biopic, THIS.biopic));
                section_one.children[1].insertAdjacentHTML("afterbegin", format(html_name, THIS.name));
                section_one.children[2].insertAdjacentHTML("afterbegin", format(html_role, THIS.role));
                section_one.children[3].insertAdjacentHTML("afterbegin", format(html_message, THIS.welcomeMessage));

                //--------------------------------------------------SKILLS

                // set needed vars
                var skills = THIS.skills,
                    frontend_skills = skills.frontend,
                    backend_skills = skills.backend;

                // embed skills if they are provided
                if (frontend_skills.length || backend_skills.length) {
                    // cache the skills section
                    var skills_section = document.getElementById("section-skills");
                    // add the label to the page +
                    skills_section.insertAdjacentHTML("afterbegin", html_skills_start);

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
                            (skills_list).forEach(function(skill) {
                                skills_html_string += format(html_skill, skill);
                            });
                            // add the entry to the page
                            skills_section.insertAdjacentHTML("beforeend", html_entry);
                            // get the last inserted entry
                            var entries = skills_section.getElementsByClassName("entry");
                            var last_entry = entries[entries.length - 1];
                            // left side
                            last_entry.children[0].insertAdjacentHTML("afterbegin", label_html);
                            // right side
                            last_entry.children[1].insertAdjacentHTML("afterbegin", skills_html_string);
                        }
                    };

                    // add skills
                    add_skills(frontend_skills, html_skills_label_frontend);
                    add_skills(backend_skills, html_skills_label_backend);
                }
            }
        };
        // ----------------------------------EDUCATION Object
        var education = {
            "schools": [{
                "name": "UC Merced",
                "location": "Merced, CA",
                "degree": "Bachelor's",
                "majors": ["Biology"],
                "dates": "2015",
                "url": "http://www.ucmerced.edu/"
            }],
            "onlineCourses": [{
                "title": "Intro to Programming Nanodegree",
                "school": "Udacity",
                "date": "2016",
                "url": "https://www.udacity.com/course/intro-to-programming-nanodegree--nd000"
            }],
            "display": function() {
                /**
                 * @description Adds the education HTML to the page.
                 */
                //--------------------------------------------------TRADITIONAL-SCHOOL

                // cache the education section
                var education_section = document.getElementById("section-education");

                // add the label to the page
                education_section.insertAdjacentHTML("afterbegin", html_education_start);

                // loop through school objects and add them to the page
                (this.schools).forEach(function(school) {
                    // add the entry to the page
                    education_section.insertAdjacentHTML("beforeend", html_entry);
                    // get the last inserted entry
                    var entries = education_section.getElementsByClassName("entry");
                    var last_entry = entries[entries.length - 1];
                    // set needed vars
                    var majors = school.majors,
                        majors_html_string = "";
                    // build majors HTML
                    (majors).forEach(function(major) {
                        majors_html_string += format(html_education_major, major);
                    });
                    // left side
                    last_entry
                        .children[0]
                        .insertAdjacentHTML("afterbegin", format(html_education_school_name, school.name, school.url) +
                            format(html_education_location, school.location) +
                            format(html_education_generic, school.dates));
                    // right side
                    last_entry
                        .children[1]
                        .insertAdjacentHTML("afterbegin", format(html_education_degree, school.degree) + majors_html_string);
                });

                //--------------------------------------------------ONLINE-SCHOOL

                // loop through online school objects and add them to the page
                (this.onlineCourses).forEach(function(online_course) {
                    // add the entry to the page
                    education_section.insertAdjacentHTML("beforeend", html_entry);
                    // get the last inserted entry
                    var entries = education_section.getElementsByClassName("entry");
                    var last_entry = entries[entries.length - 1];
                    // left side
                    last_entry
                        .children[0]
                        .insertAdjacentHTML("afterbegin", format(html_education_school_name_online, online_course.school) +
                            format(html_education_generic, online_course.date));
                    // right side
                    last_entry
                        .children[1]
                        .insertAdjacentHTML("afterbegin", format(html_education_generic_bold, online_course.title, online_course.url));
                });
            }
        };
        // ----------------------------------WORK Object
        var work = {
            "jobs": [{
                "employer": "Google",
                "title": "Web Developer",
                "location": "Mountain View",
                "dates": "Jan 2010 - Future",
                "description": "Pellentesque euismod nisi ut lectus hendrerit," +
                    " interdum efficitur libero molestie."
            }, {
                "employer": "Apple",
                "title": "Web Developer",
                "location": "Cupertino, CA",
                "dates": "2006 - Dec 31, 2009",
                "description": "Sed efficitur tempus bibendum. Vivamus eget ante " +
                    "rutrum, euismod mi accumsan, efficitur ex."
            }],
            "display": function() {
                /**
                 * @description Adds the work HTML to the page.
                 */
                //--------------------------------------------------JOBS

                // cache the work experience section
                var workexp_section = document.getElementById("section-workexp");

                // add the label to the page
                workexp_section.insertAdjacentHTML("afterbegin", html_workexp_start);

                // loop through jobs objects and add them to the page
                (this.jobs).forEach(function(job) {
                    // add the entry to the page
                    workexp_section.insertAdjacentHTML("beforeend", html_entry);
                    // get the last inserted entry
                    var entries = workexp_section.getElementsByClassName("entry");
                    var last_entry = entries[entries.length - 1];
                    // left side
                    last_entry
                        .children[0]
                        .insertAdjacentHTML("afterbegin", (format(html_workexp_employer, job.employer) +
                            format(html_workexp_title, job.title) +
                            format(html_workexp_location, job.location) +
                            format(html_workexp_generic, job.dates)));
                    // right side
                    last_entry
                        .children[1]
                        .insertAdjacentHTML("afterbegin", format(html_workexp_generic, job.description));
                });
            }
        };
        // ----------------------------------PROJECTS Object
        var projects = {
            // I woule rather link to the project on GitHub, for example, rather...
            // than add the any images to the resume. I feel this keeps things...
            // clear and separate.
            "projects": [{
                "title": "Socket.IO",
                "dates": "2011-Present",
                "description": "Realtime application framework (Node.JS server)",
                "url": "https://github.com/socketio/socket.io"
            }, {
                "title": "jQuery",
                "dates": "2007-Present",
                "description": "jQuery JavaScript Library",
                "url": "https://github.com/jquery/jquery"
            }],
            "display": function() {
                /**
                 * @description Adds the projects HTML to the page.
                 */
                //--------------------------------------------------PROJECTS

                // cache the workExperience section
                var projects_section = document.getElementById("section-projects");

                // add the label to the page
                projects_section.insertAdjacentHTML("afterbegin", html_projects_start);

                // loop through projects objects and add them to the page
                (this.projects).forEach(function(project) {
                    // add the entry to the page
                    projects_section.insertAdjacentHTML("beforeend", html_entry);
                    // get the last inserted entry
                    var entries = projects_section.getElementsByClassName("entry");
                    var last_entry = entries[entries.length - 1];
                    // left side
                    last_entry
                        .children[0]
                        .insertAdjacentHTML("afterbegin", (format(html_project_name, project.title) +
                            format(html_project_generic, project.dates) +
                            format(html_project_link, "", project.url)));
                    // right side
                    last_entry
                        .children[1]
                        .insertAdjacentHTML("afterbegin", format(html_project_generic, project.description));
                });
            }
        };

        //--------------------------------------------------INVOKE DISPLAY FUNCTIONS

        // invoke object display functions regardless of order
        (shuffle([bio, work, projects, education])).forEach(function(obj) {
            obj.display();
        });

        // prepare for iOS devices
        prepare_ios();

    }

};
