const loadConfigs = require('./loadConfigs');
const loadString = require('./loadString');
const computeComponent = require('./createComponent');
const writeFileToDisk = require('./writeFileToDisk');


function createHtml(source) {
    const configs  = loadConfigs(source);

    for(config of configs) {
        const strings = loadString(config.context, config.filePath, config.xsl);
        const component = computeComponent(strings.htmlString, config.context, strings.stylesheetString);
        writeFileToDisk(`build/html/${config.dirName}.html`, component);
    }
}

module.exports = createHtml;
