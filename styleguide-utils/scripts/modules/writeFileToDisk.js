const fs = require('fs');

function writeFileToDisk(path, data) {
    fs.writeFileSync(path, data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

module.exports = writeFileToDisk;
