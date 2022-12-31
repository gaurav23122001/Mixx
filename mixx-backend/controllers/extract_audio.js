const ffmpeg = require("fluent-ffmpeg");
const fs = require('fs');
const request = require('request');
const getRandomId = require("../utils/file_id");

const Upload_Directory_path = '/home/bugswriter/Desktop/Mixx/mixx-backend/uploads/';
const Output_Directory_path = '/home/bugswriter/Desktop/Mixx/mixx-backend/outputs/';


const extractAudioFromFile = (fileName, audioFormat) => {
    return new Promise((resolve, reject) => {
        const ffmpegProcess = new ffmpeg(Upload_Directory_path + fileName)
            .outputOptions([])
            // .audioCodec(audioFormat)
            .format(audioFormat === 'aac' ? 'adts' : audioFormat)
            .on('progress', (progress) => {
                console.log('Processing: ' + Math.ceil(progress.percent) + '% done');
            })
            .on('error', (err) => {
                console.error(err);
            })
            .save(Output_Directory_path + fileName.split('.')[0] + '.' + audioFormat)


        // When the process is finished, resolve the promise
        ffmpegProcess.on('end', () => {
            return resolve(
                `${Output_Directory_path}${fileName.split('.')[0]}.${audioFormat}`
            )
        });

        // If an error occurs, reject the promise
        ffmpegProcess.on('error', () => reject('Error while converting file'));
    })
}

const downloadVideoFromUrl = (videoUrl) => {
    const videoExtention = videoUrl.split('.').pop();
    const videoName = getRandomId() + '.' + videoExtention;

    return new Promise((resolve, reject) => {
        const downloadProcess = request(videoUrl)
            .pipe(fs.createWriteStream(`${Upload_Directory_path}${videoName}`))

        downloadProcess.on('finish', () => {
            resolve(`${Upload_Directory_path}${videoName}`);
        })
        downloadProcess.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = { extractAudioFromFile, downloadVideoFromUrl };