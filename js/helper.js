//--------------------------------------------------HTML TEMPLATES

// contacts HTML
var html_contact_popup_wrapper = '<div class="none popup" id="wrapper-popup-contact"><ul class="ul-fix"></ul></div>';
var html_contact_button = '<button class="btn-default noselect" id="btn-contact">get in touch</button>';
var html_contact_item_generic = '<li class="popup-item"><span class="popup-label">%contact%</span> <span>%data%</span></li>';

// bio HTML
var html_bio_wrappers = '<div class="cont-biopic none" id="wrapper-biopic"></div><div id="wrapper-name"></div><div class="cont-role" id="wrapper-role"></div><div class="cont-welcome" id="wrapper-welcome-message"></div>';
var html_biopic = '<picture><img src="%data%" alt="resume image" class="img-biopic" id="biopic"></picture>';
var html_name = '<span class="text-name" id="name">%data%</span>';
var html_role = '<span class="text-gray text-100 text-size-16" id="role">%data%</span>';
var html_message = '<span>%data%</span>';

// item entry HTML
var html_entry = '<div class="entry"><div class="entry-left"></div><div class="entry-right"></div></div>';

// work experience HTML
var html_workexp_start = '<div class="section-label"><span class="text-600 text-silver">EXPERIENCE</span></div>';
var html_workexp_employer = '<div class="text-600">%data%';
var html_workexp_title = ' - %data%</div>';
var html_workexp_location = '<div class="text-gray">%data%</div>';
var html_workexp_generic = '<div>%data%</div>';

// skills HTML
var html_skills_start = '<div class="section-label"><span class="text-600 text-silver">SKILLS</span></div>';
var html_skill = '<span class="tag">%data%</span>';
var html_skills_label_frontend = '<div class="text-600">Front End</div>';
var html_skills_label_backend = '<div class="text-600">Back End</div>';

// projects HTML
var html_projects_start = '<div class="section-label"><span class="text-600 text-silver">PROJECTS</span></div>';
var html_project_name = '<div class="text-600">%data%</div>';
var html_project_generic = '<div>%data%</div>';
var html_project_link = '<div><a href="#" class="text-blue text-link">see project</a></div>';

// traditional education HTML
var html_education_start = '<div class="section-label"><span class="text-600 text-silver">EDUCATION</span></div>';
var html_education_school_name = '<div class="text-600"><a href="#" class="text-link">%data%</a></div>';
var html_education_location = '<div class="text-gray">%data%</div>';
var html_education_generic = '<div>%data%</div>';
var html_education_degree = '<span class="text-600">%data%</span> ';
var html_education_major = '<span class="text-unbold tag">%data%</span>';

// online class HTML
var html_education_school_name_online = '<div class="text-600">%data% <span class="class-online noselect">online</span></div>';
var html_education_generic_bold = '<div class="text-600"><a href="#" class="text-link">%data%</a></div>';

//--------------------------------------------------FORMAT FUNCTION

function format(template, data, url) {
/**
* @description Formats provided template.
* @param {string} template
* @param {string} data
* @param {string <OPTINAL>} url
* @returns {string} Formated template with provided data. If url is provided...
                 we do another replace to replace the 'href="#"' with the provided url.
*/
    return template
            .replace("%data%", data)
            .replace(((!url) ? null : ('href="#"')),
                ((!url) ? null : 'href=' + url + ' target="_blank"'));
}

//--------------------------------------------------SHUFFLE FUNCTION

function shuffle(array) {
/**
 * @source [http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript]
 * @source [https://bost.ocks.org/mike/shuffle/]
 * @description Shuffles array in place.
 * @param {array} array
 * @returns {array} Originally provided array but now shuffled in place.
 */
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}