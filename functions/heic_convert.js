const fs = require('fs');
const { promisify } = require('util');
const convert = require('heic-convert');

async function heic_convert(input, output, quality = 100){
    const inputBuffer = await promisify(fs.readFile)(input);
    const outputBuffer = await convert({
      buffer: inputBuffer,      // the HEIC file buffer
      format: 'JPEG',           // output format
      quality: quality / 100    // the jpeg compression quality, between 0 and 1
    });
  
    await promisify(fs.writeFile)(output, outputBuffer);
}

module.exports = heic_convert;