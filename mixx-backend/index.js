const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const app = express();
require('dotenv').config();
const morgan = require("morgan");
const cors = require("cors");

const { authRouter } = require('./routes/auth.js');

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors);

/* Routes */

app.get('/register', authRouter);
app.get('/login', authRouter);


app.get('/extract-audio', (req, res) => {
    // Process the video file and extract the audio
    ffmpeg()
        .input('test.mp4')
        .outputOptions(['-vn', '-acodec libmp3lame', '-ab 128k', '-ar 44100'])
        .on('error', (err) => {
            console.error(err);
        })
        .on('end', () => {
            console.log('Conversion complete');
        })
        .save('output.mp3');

});

app.get('/audio', (req, res) => {
    // Return the audio file as a response
    res.set('Content-Type', 'audio/mpeg');
    res.sendFile('output.mp3', { root: __dirname });
});

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});



