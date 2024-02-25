const ext       = require('./get_ext');
const exists    = require('./file_exists');

function is_live_mov(file){
    if(!exists(file)) return false;
    
    const file_ext = ext(file);
    const heic_file = file.replace(file_ext, '.heic');

    return exists(heic_file);
}

module.exports = is_live_mov;