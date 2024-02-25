const sharp         = require('sharp');
const fs            = require('fs');
const hc            = require('./functions/heic_convert.js');
const get_ext       = require('./functions/get_ext.js');
const fileExists    = require('./functions/file_exists.js');
const ext_lowercase = require('./functions/ext_to_lowercase.js');
const is_live_mov   = require('./functions/is_live_mov.js');


const config = {
    compressionOptions: { // Define compression settings
        quality: 70 // Adjust quality as needed (0 to 100)
    },
    inputFolder: './input',
    outputFolder: './output',
    deleteLiveMOV: true,
}

async function renameFiles(){
    const files = fs.readdirSync(config.inputFolder);

    console.log('Started renaming files');
    try {
        for(let i = 0; i < files.length; i++){
            const file = `${config.inputFolder}/${files[i]}`;
            ext_lowercase(file);
            
        }
        console.log(`Renamed ${files.length} files`);
    } catch (error) {
        console.error(`Error appeared while renaming files: ${error}`);
    }
    
}

async function main(){
    await renameFiles(); // make sure all file extensions are lowercase
    
    // Read the contents of the folder synchronously
    const files = fs.readdirSync(config.inputFolder);
    
    
    for(let i = 0; i < files.length; i++){
        const file = `${config.inputFolder}/${files[i]}`;

        switch(get_ext(file)){
            case '.mov':
                if(config.deleteLiveMOV && is_live_mov(file)){
                    fs.unlinkSync(file);
                }
                break;
        }
    }
}


main();

// Compress the image
// sharp(inputFile)
//   .jpeg(compressionOptions)
//   .toFile(outputFile)
//   .then(() => console.log('Image compressed successfully'))
//   .catch(err => console.error('Error compressing image:', err));