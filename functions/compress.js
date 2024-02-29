const sharp = require('sharp');
const fs = require('fs');

// Compress the image
async function compress(inputFile, outputFile, compressionOptions, compressLimit = null){
    if(compressLimit){
        const mb = fs.statSync(inputFile).size / (1024 * 1024);
        if(mb <= compressLimit){
            console.log(`Decided not to compress ${inputFile}`);
            compressionOptions = { quality: 100 };
        }
    }

    await sharp(inputFile)
        .jpeg(compressionOptions)
        .toFile(outputFile)
        .catch(err => console.error('Error compressing image:', err));
}

module.exports = compress;