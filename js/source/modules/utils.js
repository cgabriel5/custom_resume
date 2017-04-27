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
            .replace(
                !url ? null : 'href="#"',
                !url ? null : "href=" + url + ' target="_blank"'
            );
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
