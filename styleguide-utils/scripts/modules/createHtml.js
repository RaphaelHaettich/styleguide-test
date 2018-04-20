const loadConfigs = require('./loadConfigs');
const loadString = require('./loadString');
const computeComponent = require('./createComponent');
const writeFileToDisk = require('./writeFileToDisk');

function isTrue(currentValue) {
    return currentValue === true;
}

function createHtml(source) {
    const configs  = loadConfigs(source);
    const results = [];

    for(config of configs) {
        const strings = loadString(config.context, config.filePath, config.xsl);
        const component = computeComponent(strings.htmlString, config.context, strings.stylesheetString);
        const result = writeFileToDisk(`build/html/${config.dirName}.html`, component);
        results.push(result);
    }
    const everyThingSaved = results.every(isTrue);
    if(everyThingSaved) {
        return true;
    }
    throw new Error(`Not all files saved`, results);
}

module.exports = createHtml;
