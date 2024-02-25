const path = require('path');

function get_ext(filePath) {
    // Get the extension of the file
    return path.extname(filePath);
}

module.exports = get_ext;
  