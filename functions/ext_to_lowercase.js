const fs = require('fs');

function ext_to_lowercase(filePath) {
    const newPath = filePath.replace(/\.[^.]+$/, ext => ext.toLowerCase());
    fs.renameSync(filePath, newPath);
}

module.exports = ext_to_lowercase;