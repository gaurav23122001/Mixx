
const cors = require('cors');
require('dotenv').config();
const morgan = require("morgan");
const upload = require('./middlewares/multer');
const { extractAudioFromFile, downloadVideoFromUrl } = require('./controllers/extract_audio');
const uploadFileToBucket = require('./controllers/storageBucket');
const PORT = process.env.PORT || 5000;
const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server, {
        cors: {
            origin: '*'
        }
    });
server.listen(PORT, () => console.log("Server running at PORT " + PORT));
const mongoose = require('mongoose');

app.set('io', io);

io.on('connection', (socket) => {
    console.log('a user connected ' + socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected ' + socket.id);
    });
});


const authRouter = require('./routes/auth.js');
const projectRouter = require('./routes/project/createProject.js');
const { deleteProjectRouter } = require('./routes/project/deleteProject');
const commentAndTimeRouter = require('./routes/project/addCommentAndTime');
const getAllProjectsRouter = require('./routes/project/getAllProjects');

app.use(cors({
    origin: '*',
}));
app.use(express.json());

mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));

app.post('/upload-url', async (req, res) => {
    const videoUrl = req.body.videoUrl;
    const audioFormat = req.body.audioFormat;
    const userId = req.body.userId;
    try {
        console.log(req.body);
        const videoPath = await downloadVideoFromUrl(videoUrl)
        console.log(videoPath);
        const filePath = await extractAudioFromFile(videoPath.split('/').pop(), audioFormat)
        console.log(filePath);
        const url = await uploadFileToBucket(filePath, audioFormat);

        const project = new Project({
            name: videoPath.split('/').pop(),
            audioURL: url,
            audioFormat: audioFormat,
            userId: userId
        })
        await project.save();


        res.status(200).json(url)
    } catch (error) {
        console.log(error);
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
app.use('/project', deleteProjectRouter);
app.use('/project', commentAndTimeRouter)
app.use('/project', getAllProjectsRouter)


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}



app.get('/download', function (req, res) {
    const file = `https://mixx-70ce9.appspot.com.storage.googleapis.com/Ghodey%20Pe%20Sawaar%20-%20Lyrics%20-%20Qala%20-%20Amit%20Trivedi_GeVUcFl.mp3?GoogleAccessId=firebase-adminsdk-y6yc6%40mixx-70ce9.iam.gserviceaccount.com&Expires=1673690056&Signature=f3vbYXUsZP010hvk5VGzkXlsyfS5PH8TuXM%2FUAUNVmqPAsKsXsjwzqVSAovKTL%2FHdU8u7kn3J1sx7bwE8XscgHw0zxf3whduLy%2BZGOd%2BhSxTIHpcJ99eEnRklbNO8%2BGMsN%2FnweoFQLZHzzDxNB%2F7U%2FlKbyuTaKOzNO5v5ZCRIpyYBey0g2hurOwbbaZZIChUS869rlZOJwB2DKMJ9p6dao9FFAUzkXULquh9Yfa8fZWKVY9225ziIJZ%2BwJLc6MphlkLYdT8hFH%2BX4X7lDosefOu1zzevlYXfdLIzYLZBYp9vW4kRiok8ywQx3fnGZPbTEWb5M%2BavviLph7SahDZPOw%3D%3D`;
    console.log(file);
    res.download(file); // Set disposition and send it.
});