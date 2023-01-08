
const cors = require('cors');
require('dotenv').config();
const morgan = require("morgan");
const upload = require('./middlewares/multer');
const Project = require('./models/project');
const User = require('./models/user');
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
const CTTRouter = require('./routes/project/addCommentAndTime');
const getAllProjectsRouter = require('./routes/project/getAllProjects');
const getAllCTTRouter = require('./routes/project/getAllCTT');

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
        console.log(videoPath.split('/').pop());
        const filePath = await extractAudioFromFile(videoPath.split('/').pop(), audioFormat)
        console.log(filePath);
        const url = await uploadFileToBucket(filePath, audioFormat);

        const newProject = new Project({
            name: videoPath.split('/').pop(),
            audioURL: url,
            audioFormat: audioFormat,
            user: userId
        })
        await newProject.save().then(async (project) => {
            await User.findOne({ _id: userId }).then(user => {
                user.savedProjects.push(project);
                user.save();
            })
            res.status(200).json(project);
        })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json('The URL Format is not supported!')
    }
})


app.post('/upload-file', upload, async (req, res) => {
    // specify the output format here
    const audioFormat = req.body.audioFormat;

    try {
        const name = req.file.filename
        console.log(req.file.filename);
        const filePath = await extractAudioFromFile(req.file.filename, audioFormat)
        const url = await uploadFileToBucket(filePath, audioFormat);
        const userId = req.body.userId;
        const newProject = new Project({
            name,
            audioFormat,
            audioURL: url,
            user: userId
        });
        await newProject.save()
            .then(async (project) => {
                await User.findOne({ _id: userId }).then(user => {
                    // console.log(user);
                    user.savedProjects.push(project);
                    user.save();
                })
                res.status(200).json(project);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    } catch (error) {
        res.status(500).json(error + " error index file")
    }
})

app.use('/auth', authRouter);
app.use('/project', projectRouter);
app.use('/project', deleteProjectRouter);
app.use('/project', CTTRouter)
app.use('/project', getAllProjectsRouter)
app.use('/project', getAllCTTRouter)


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}



