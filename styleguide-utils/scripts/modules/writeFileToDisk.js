const fs = require('fs');

function writeFileToDisk(path, data) {
    fs.writeFileSync(path, data, function(err) {
        if(err) {
            return err;
        }
        console.log("The file was saved!");
    });

    return true;
}

module.exports = writeFileToDisk;
