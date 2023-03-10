const express = require('express');
const Project = require('../../models/project');
const User = require('../../models/user');

const projectRouter = express.Router();

projectRouter.post('/create', async (req, res) => {
      const { name, description, audioFormat, audioURL, timeStampAndComment, user } = req.body;
      const userId = req.body.userId;
      console.log(req.body);
      const newProject = new Project({
            name,
            description,
            audioFormat, 
            audioURL,
            timeStampAndComment,
            user
      });
      await newProject.save()
            .then(async (project) => {
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
});


module.exports = projectRouter;