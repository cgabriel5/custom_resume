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
                contact_popup.children[0].insertAdjacentHTML(
                    "afterbegin",
                    contacts_html_string
                );
            }

            //--------------------------------------------------CONTACTS POPUP CLICK EVENT

            // listen for click events on the DOM
            document.addEventListener("click", function(e) {
                // cache the target + "hover" check
                var target = e.target,
                    check =
                        [contact_btn, contact_popup].indexOf(target) !== -1 ||
                        contact_popup.contains(target);
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
                var majors = school.majors, majors_html_string = "";
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
