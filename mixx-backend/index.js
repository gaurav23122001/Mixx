const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRouter = require('./routes/auth.js');
const projectRouter = require('./routes/project/createProject.js');


app.use(express.json());
app.use(cors());
dotenv.config();
app.use('/auth', authRouter);
app.use('/project', projectRouter);


const PORT = process.env.PORT || 5005;
mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    )



/* Routes */



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



