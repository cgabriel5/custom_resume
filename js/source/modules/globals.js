app.module("globals", function(modules, name) {
    /**
     * @description [Object containing the data used to fill out the resume block sections.]
     * @type {Object}
     */
    var data = {
        bio: {
            name: "John Doe",
            role: "a web developer",
            contacts: {
                mobile: "650-555-5555",
                email: "johndoe@example.com",
                github: "johndoe",
                twitter: "@johndoe",
                location: "San Francisco, CA"
            },
            welcomeMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
                " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            skills: {
                frontend: ["HTML", "CSS", "JavaScript, jQuery"],
                backend: ["PHP", "Python", "MySQL", "NodeJS (Socket.IO)"]
            },
            biopic: "images/fry.jpg"
        },
        education: {
            schools: [
                {
                    name: "UC Merced",
                    location: "Merced, CA",
                    degree: "Bachelor's",
                    majors: ["Biology"],
                    dates: "2015",
                    url: "http://www.ucmerced.edu/"
                }
            ],
            onlineCourses: [
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
                {
                    employer: "Google",
                    title: "Web Developer",
                    location: "Mountain View",
                    dates: "Jan 2010 - Future",
                    description: "Pellentesque euismod nisi ut lectus hendrerit," +
                        " interdum efficitur libero molestie."
                },
                {
                    employer: "Apple",
                    title: "Web Developer",
                    location: "Cupertino, CA",
                    dates: "2006 - Dec 31, 2009",
                    description: "Sed efficitur tempus bibendum. Vivamus eget ante " +
                        "rutrum, euismod mi accumsan, efficitur ex."
                }
            ]
        },
        projects: {
            // I woule rather link to the project on GitHub, for example, rather...
            // than add the any images to the resume. I feel this keeps things...
            // clear and separate.
            projects: [
                {
                    title: "Socket.IO",
                    dates: "2011-Present",
                    description: "Realtime application framework (Node.JS server)",
                    url: "https://github.com/socketio/socket.io"
                },
                {
                    title: "jQuery",
                    dates: "2007-Present",
                    description: "jQuery JavaScript Library",
                    url: "https://github.com/jquery/jquery"
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
        html_contact_popup_wrapper: '<div class="none popup" id="wrapper-popup-contact"><ul class="ul-fix"></ul></div>',
        html_contact_button: '<button class="btn-default noselect" id="btn-contact">get in touch</button>',
        html_contact_item_generic: '<li class="popup-item"><span class="popup-label">%contact%</span> <span>%data%</span></li>',
        // bio HTML
        html_bio_wrappers: '<div class="cont-biopic none" id="wrapper-biopic"></div><div id="wrapper-name"></div><div class="cont-role" id="wrapper-role"></div><div class="cont-welcome" id="wrapper-welcome-message"></div>',
        html_biopic: '<picture><img src="%data%" alt="resume image" class="img-biopic" id="biopic"></picture>',
        html_name: '<span class="text-name" id="name">%data%</span>',
        html_role: '<span class="text-gray text-100 text-size-16" id="role">%data%</span>',
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
