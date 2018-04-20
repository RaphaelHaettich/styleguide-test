const fs = require('fs');
const path = require('path');
const FileHound = require('filehound');

function loadConfigs(source) {
    const components = [];
    const dirPath = path.join(process.cwd(),source);
    const subdirectories = FileHound.create()
        .path(dirPath)
        .directory()
        .findSync();

    for(const dir of subdirectories) {
        const dirName = dir.split("/").pop();
        const filePath = `${dir}/${dirName}`;
        const context = JSON.parse(fs.readFileSync(`${filePath}.json`, 'utf8'));

        components.push({xsl: context.xsl, context: context, filePath: filePath, dirName: dirName});
    }
    return components;
}

module.exports = loadConfigs;
