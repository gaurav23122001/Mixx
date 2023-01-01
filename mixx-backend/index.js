const express = require('express');
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
=======
const cors = require('cors');
require('dotenv').config();
const morgan = require("morgan");
const upload = require('./middlewares/multer');
const { extractAudioFromFile, downloadVideoFromUrl } = require('./controllers/extract_audio');
const uploadFileToBucket = require('./controllers/storageBucket');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(cors({
    origin: 'http://localhost:8100',
}));
app.use(express.json());

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


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


io.on('connection', (socket) => {
    console.log('a user connected' + socket.id);
});


