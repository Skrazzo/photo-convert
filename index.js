const sharp = require('sharp');
const fs = require('fs');
const { promisify } = require('util');
const convert = require('heic-convert');

const inputFile = 'IMG_1645.HEIC';
const outputFile = 'IMG_1645.jpg';

// Define compression settings
const compressionOptions = {
    quality: 70 // Adjust quality as needed (0 to 100)
};


(async () => {
    const inputBuffer = await promisify(fs.readFile)(inputFile);
    const outputBuffer = await convert({
      buffer: inputBuffer, // the HEIC file buffer
      format: 'JPEG',      // output format
      quality: 0.7           // the jpeg compression quality, between 0 and 1
    });
  
    await promisify(fs.writeFile)('./result.jpg', outputBuffer);
})();

// Compress the image
// sharp(inputFile)
//   .jpeg(compressionOptions)
//   .toFile(outputFile)
//   .then(() => console.log('Image compressed successfully'))
//   .catch(err => console.error('Error compressing image:', err));