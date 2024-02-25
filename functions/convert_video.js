const ffmpeg = require('fluent-ffmpeg');

async function convert_video(inputFilePath, outputFilePath, crf = 22) {
  return new Promise((resolve, reject) => {
    const command = ffmpeg(inputFilePath)
      .videoCodec('libx264')
      .audioCodec('aac')
      .audioBitrate('128k')
      .outputOptions(['-preset slow', `-crf ${crf}`])
      .on('end', () => {
        console.log('Conversion finished:', inputFilePath);
        resolve();
      })
      .on('error', err => {
        console.error('Error during conversion:', err);
        reject(err);
      })
      .save(outputFilePath);
  });
}

module.exports = convert_video;