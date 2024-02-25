const ffmpeg = require('fluent-ffmpeg');

function convert_video(inputFilePath, outputFilePath, callback, crf = 22) {
  ffmpeg(inputFilePath)
    .videoCodec('libx264')
    .audioCodec('aac')
    .audioBitrate('128k')
    .outputOptions(['-preset slow', `-crf ${crf}`])
    .on('end', () => {
      callback(null);
    })
    .on('error', err => {
      callback(err);
    })
    .save(outputFilePath);
}

module.exports = convert_video;