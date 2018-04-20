const libxslt = require('libxslt');
const fs = require('fs');
const Mark = require('markup-js');
const path = require('path');
const FileHound = require('filehound');

const source = 'src/components';
const dirPath = path.join(process.cwd(),source);

const subdirectories = FileHound.create()
    .path(dirPath)
    .directory()
    .findSync();

loadConfig(subdirectories);

function loadConfig(subdirectories) {
    for(let i = 0; i < subdirectories.length; i++) {
        const filePath = subdirectories[i] + '/' + subdirectories[i].split("/").pop();
        const context = JSON.parse(fs.readFileSync(filePath + '.json', 'utf8'));

        if( context.xsl === true ) {
            loadWithXsl(context, filePath);
        } else {
            loadWithHtml(context, filePath);
        }
    }
}

function loadWithXsl(context, filePath) {
    const stylesheetString = fs.readFileSync(filePath +'.xsl', 'utf8');
    const documentString = '<div />';
    const stylesheet = libxslt.parse(stylesheetString);

    if(context.variations === true) {
        let htmlString = '';
        const modifiers = context.data.modifiers;
        for(let i = 0; i < modifiers.length; i++) {
            const params = modifiers[i];

            htmlString = htmlString + stylesheet.apply(documentString, params);
        }

        console.log("load with xsl and variations");

        create(htmlString, context, stylesheetString);


    } else {
        const stylesheet = libxslt.parse(stylesheetString);

        const htmlString = stylesheet.apply(documentString);

        console.log("load with xsl and npo variations");

        create(htmlString, context, stylesheetString);
    }

}

function loadWithHtml(context, filePath) {
    const htmlString = fs.readFileSync(filePath + '.html', 'utf8');

    console.log("load with html");

    create(htmlString, context);
}

function create(htmlString, context, stylesheet) {
    if( context.component === true ) {
        console.log("component");
        computeComponent(htmlString, context, stylesheet);
    } else {
        console.log("not a component");
    }
}

function computeComponent(htmlString, context, stylesheet) {
    const componentTpl = fs.readFileSync('styleguide-utils/templates/component.tpl', 'utf8');

    context.data.html = htmlString;

    if(stylesheet) {
        context.data.escapedHtml = stylesheet.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").trim();
    } else {
        context.data.escapedHtml = htmlString.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").trim();
    }

    const result = Mark.up(componentTpl, context);

    // console.log(result);

    fs.writeFileSync("build/html/"+ context.name +".html", result, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}
