const fs = require('fs');
const libxslt = require('libxslt');

function loadString(context, filePath, xslBool) {
    const documentString = '<div />';

    if(xslBool) {
        const stylesheetString = fs.readFileSync(filePath +'.xsl', 'utf8');
        const stylesheet = libxslt.parse(stylesheetString);
        if(context.variations === true) {
            let htmlString = '';
            const modifiers = context.data.modifiers;
            for(let i = 0; i < modifiers.length; i++) {
                const params = modifiers[i];

                htmlString = htmlString + stylesheet.apply(documentString, params);
            }

            console.log("load with xsl and variations");

            return {htmlString, stylesheetString};
        }
        const htmlString = stylesheet.apply(documentString);
        console.log("load with xsl and npo variations");
        return {htmlString, stylesheetString}
    }
    const htmlString = fs.readFileSync(filePath + '.html', 'utf8');
    console.log("load with html");

    return {htmlString};
}

module.exports = loadString;
