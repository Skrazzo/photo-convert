const fs            = require('fs');
const heic_convert  = require('./functions/heic_convert.js');
const get_ext       = require('./functions/get_ext.js');
const fileExists    = require('./functions/file_exists.js');
const ext_lowercase = require('./functions/ext_to_lowercase.js');
const is_live_mov   = require('./functions/is_live_mov.js');
const compress      = require('./functions/compress.js');
const convert_video = require('./functions/convert_video.js');

const config = {
    compressionOptions: { // Define compression settings
        quality: 70 // Adjust quality as needed (0 to 100)
    },
    inputFolder: './input',
    outputFolder: './output',
    deleteLiveMOV: true,
    // Constant Rate Factor (CRF) for video quality. Lower values result in higher quality
    // but larger file sizes. 22 is a good balance between quality and file size.
    crf: 22,
    compressMinLimit: 1, // files under MB wont be compressed
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
    const allowedVideoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.mpeg',];
    
    
    console.log("Starting to convert and compress files");
    for(let i = 0; i < files.length; i++){
        const file = `${config.inputFolder}/${files[i]}`;

        switch(get_ext(file)){
            case '.mov':
                if(config.deleteLiveMOV && is_live_mov(file)){
                    fs.unlinkSync(file);
                }else{

                    if(!is_live_mov(file)){
                        if(allowedVideoExtensions.includes(get_ext(file))){
                            await convert_video(file, `${config.outputFolder}/${files[i].replace(get_ext(file), '.mp4')}`, config.crf);
                        }
                    }
                }

                break;
            case '.heic':
                heic_convert(
                    file, 
                    `${config.outputFolder}/${files[i].replace('.heic', '.jpg')}`,
                    config.compressionOptions.quality,
                    config.compressMinLimit
                ).then(() => {console.log('Finished converting:', files[i].replace('.heic', '.jpg'))});

                break;
            default:
                const allowedPictureExt = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.tiff', '.gif'];

                if(allowedVideoExtensions.includes(get_ext(file))){
                    await convert_video(file, `${config.outputFolder}/${files[i].replace(get_ext(file), '.mp4')}`, config.crf);
                }else{
                    if(!allowedPictureExt.includes(get_ext(file))){
                        console.log(`${files[i]} is not in the supported file extension array!`);
                        break;
                    }
    
                    compress(file, `${config.outputFolder}/${files[i]}`, config.compressionOptions, config.compressMinLimit).then(() => console.log('Finished compressing: ', files[i]));

                }
                
                break;
        }
    }

}


main();
