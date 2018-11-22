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
                frontend: ["HTML", "CSS", "SCSS", "JavaScript"],
                backend: ["PHP", "MySQL", "NodeJS"]
            },
            biopic: "img/default.png" // [https://www.iconfinder.com/icons/1564522/camera_capture_photo_icon#size=128]
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
            projects: [
                {
                    title: "devdocs",
                    dates: "2018-Present",
                    description: "A static website documentation generator.",
                    url: "https://github.com/cgabriel5/devdocs"
                },
                {
                    title: "wapplr-webpack-gulp",
                    dates: "2018-Present",
                    description: "A web development boilerplate and tooling solution that uses webpack and Gulp.",
                    url: "https://github.com/cgabriel5/wapplr-webpack-gulp"
                },
                {
                    title: "wapplr-webpack-simple",
                    dates: "2018-Present",
                    description: "A web development webpack starter.",
                    url: "https://github.com/cgabriel5/wapplr-webpack-simple"
                },
                {
                    title: "wapplr",
                    dates: "2017-Present",
                    description: "A web development boilerplate and tooling solution.",
                    url: "https://github.com/cgabriel5/wapplr"
                },
                {
                    title: "random-string",
                    dates: "2017-Present",
                    description: "JavaScript library that creates random strings.",
                    url: "https://github.com/cgabriel5/random-string"
                },
                {
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
