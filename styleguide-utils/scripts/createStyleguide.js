const fs = require('fs');
const Mark = require('markup-js');
const path = require('path');
const FileHound = require('filehound');

getCompnentFilesToString();

function getCompnentFilesToString() {
    const source = 'build/html/';
    const dirPath = path.join(process.cwd(),source);

    const files = FileHound.create()
        .paths(dirPath)
        .ext('html')
        .findSync();

    let components = "";

    for (let i = 0; i < files.length; i++) {
        const componentHtml = fs.readFileSync(files[i], 'utf8');
        components += componentHtml;
    }
    createComponentList(components);
}

function createComponentList(components) {
    const componentListTpl = fs.readFileSync('styleguide-utils/templates/componentList.tpl', 'utf8');

    const context = {
        title: 'Components',
        components: components,
        name: 'componentlist'
    };

    const componentList = Mark.up(componentListTpl, context);

    createIndex(componentList)
}

function createIndex(componentList) {
    const indexTpl = fs.readFileSync('styleguide-utils/templates/index.tpl', 'utf8');

    const context = {
        name: 'index',
        componentList: componentList,
    };

    const index = Mark.up(indexTpl, context);

    fs.writeFileSync("dist/"+ context.name +".html", index, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}
