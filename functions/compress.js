const sharp = require('sharp');
// Compress the image
async function compress(inputFile, outputFile, compressionOptions){
    await sharp(inputFile)
        .jpeg(compressionOptions)
        .toFile(outputFile)
        .catch(err => console.error('Error compressing image:', err));
}

module.exports = compress;