const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const morgan = require("morgan");
const upload = require('./middlewares/multer');
const { extractAudioFromFile, downloadVideoFromUrl } = require('./controllers/extract_audio');
const uploadFileToBucket = require('./controllers/storageBucket');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const mongoose = require('mongoose');

const authRouter = require('./routes/auth.js');
const projectRouter = require('./routes/project/createProject.js');

app.use(cors({
    origin: 'http://localhost:8100',
}));
app.use(express.json());



app.post('/upload-url', async (req, res) => {
    const videoUrl = req.body.videoUrl;
    const audioFormat = req.body.audioFormat;
    try {
        const videoPath = await downloadVideoFromUrl(videoUrl)
        const filePath = await extractAudioFromFile(videoPath.split('/').pop(), audioFormat)
        const url = await uploadFileToBucket(filePath, audioFormat);
        res.status(200).json(url)
    } catch (error) {
        res.status(500).json('Try again! Something went wrong')
    }
})



app.post('/upload-file', upload, async (req, res) => {
    // specify the output format here
    const audioFormat = req.body.audioFormat;

    try {
        const filePath = await extractAudioFromFile(req.file.filename, audioFormat)
        const url = await uploadFileToBucket(filePath, audioFormat);
        res.status(200).json(url)
    } catch (error) {
        res.status(500).json(error + " error index file")
    }
})

app.use('/auth', authRouter);
app.use('/project', projectRouter);


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        server.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    )
    .catch((err) => console.log(err));


