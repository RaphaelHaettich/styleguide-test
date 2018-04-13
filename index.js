const libxslt = require('libxslt');
const fs = require('fs');

const stylesheetString = fs.readFileSync('src/xsl/components/SearchBox.xsl', 'utf8');

const documentString = '<div />';

const stylesheet = libxslt.parse(stylesheetString);

const result = stylesheet.apply(documentString);

console.log(result);

fs.writeFile("styleguide/build/html/searchBox.html", result, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
