const express = require('express');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();
const morgan = require("morgan");
const upload = require('./middlewares/multer');
const { extractAudioFromFile, downloadVideoFromUrl } = require('./controllers/extract_audio');
const uploadFileToBucket = require('./utils/storageBucket');

const app = express();


app.use(cors());
app.use(express.json());


app.post('/upload-file', upload, async (req, res) => {
    // specify the output format here
    try {
        const resp = await extractAudioFromFile(req.file.filename, 'mp3')
        const url = await uploadFileToBucket(resp);
        res.status(200).json(url)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.post('/upload-url', async (req, res) => {
    const videoUrl = req.body.videoUrl;
    try {
        const videoPath = await downloadVideoFromUrl(videoUrl)
        await extractAudioFromFile(videoPath.split('/').pop(), 'mp3')

        fs.unlink(videoPath, (err) => {
            if (err) {
                console.error(err)
            }
        })

        res.status(200).json('File converted successfully')
    } catch (error) {
        res.status(500).json('Try again! Something went wrong')
    }
})

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});