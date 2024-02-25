const sharp     = require('sharp');
const fs        = require('fs');
const hc        = require('./functions/heic_convert.js');
const get_ext   = require('./functions/get_ext.js');


// Define compression settings
const config = {
    compressionOptions: {
        quality: 70 // Adjust quality as needed (0 to 100)
    },
    inputFolder: './input',
    outputFolder: './output',
    deleteLiveMOV: true,
}


async function main(){
    // Read the contents of the folder synchronously
    const files = fs.readdirSync(config.inputFolder);

    // Log the list of files
    console.log(files);

    for(i = 0; i < files.length; i++){
        console.log(get_ext(`${config.input}/${files[i]}`));
    }
}


main();

// Compress the image
// sharp(inputFile)
//   .jpeg(compressionOptions)
//   .toFile(outputFile)
//   .then(() => console.log('Image compressed successfully'))
//   .catch(err => console.error('Error compressing image:', err));