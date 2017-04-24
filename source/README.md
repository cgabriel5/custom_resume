## § Read Before Use
1. Make sure to remove the `.gitignore` file from the `img/` directory before using. The file is used as a placeholder to include the otherwise empty folder with `Git`.
2. Remove setup sections (§) from the `README` after reading and fully understanding what to do.
3. Boilerplate uses `NodeJS` and `Gulp`. *Please make sure they are installed*.

## § NPM Setup
Run the following commands in the following order:
1. **`$ npm init`** &mdash; Update `package.json` as needed.
2. **`$ npm install`** &mdash; Installs needed `npm` modules.

## § Using Gulp
1. **`$ gulp`** &mdash; Runs the `default` command. This command runs the `build` and `watch` commands. Creating the needed folders/files, starts `browser-sync` servers, & watches project for file changes.
2. **`$ gulp build`** &mdash; Builds the needed folders/files for the app.
3. **`$ gulp watch`** &mdash; Watches project for file changes. Running the needed tasks to rebuild files.
4. **`$ gulp reset`** &mdash; Resets project to like when it was downloaded, to its original state.
5. **`$ gulp open-index`** &mdash; Opens `index.html` in the browser.
6. **`$ gulp open-md`** &mdash; Opens `README.md` `HTML` preview in the browser.
7. **Modify** `gulpfile.js` as desired.
8. **Note** &mdash; The `$ gulp reset` command uses the `source/` directory to reset the project to its original state. Changes made to this folder will be transferred over when the command is used.

## § Files To Modify
1. **CSS** &mdash; Modify `css/source/styles.css`. `Gulp` will handle auto-prefixing, minifying, and concatenation.
2. **JS-App** &mdash; Modify `js/source/modules/*.js` files. `Gulp` will handle file concatenation, minifying, and beautification.
3. **JS-Libs** &mdash; Add third-party libraries to `js/libs/`. Then make sure to update the `jslibs` `Gulp` task by adding the library path file to the `src` array. `Gulp` will handle file concatenation, minifying, and beautification.
4. **HTML** &mdash; Modify `html/source/i*.html` files. `Gulp` will handle file concatenation, minifying, and beautification.

# webapp-name

Webapp description.

### Purpose

The purpose of webapp-name is to...

### Live Demo

Live demo can be accessed [here](https://cgabriel5.github.io/webapp-name/).

### How It Works

Explain how it works...

### How To Use

Take a look at...

### Issues

* Issues if any... 

### Contributing

Contributions are welcome! Found a bug, feel like documentation is lacking/confusing and needs an update, have performance/feature suggestions or simply found a typo? Let me know! :)

See how to contribute [here](https://github.com/cgabriel5/webapp-name/blob/master/CONTRIBUTING.md).

### TODO

- [ ] TODO item.

### License

This project uses the [MIT License](https://github.com/cgabriel5/webapp-name/blob/master/LICENSE.txt).

