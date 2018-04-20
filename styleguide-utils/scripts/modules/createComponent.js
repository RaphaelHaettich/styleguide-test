const fs = require('fs');
const Mark = require('markup-js');


function createComponent(htmlString, context, stylesheet) {
    const componentTpl = fs.readFileSync('styleguide-utils/templates/component.tpl', 'utf8');

    context.data.html = htmlString;

    if(stylesheet) {
        context.data.escapedHtml = stylesheet.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").trim();
    } else {
        context.data.escapedHtml = htmlString.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").trim();
    }
    return Mark.up(componentTpl, context);
}

module.exports = createComponent;
