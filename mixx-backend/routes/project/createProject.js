const express = require('express');
const Project = require('../../models/project');

const projectRouter = express.Router();

projectRouter.post('/create',  async (req, res) => {
      const { name, description, audioURL, timeStampAndComment, user } = req.body;
      console.log(req.body);
      const newProject = new Project({
            name,
            description,
            audioURL,
            timeStampAndComment,
            user
      });
      await newProject.save()
            .then(project => {
                  res.status(200).json(project);
            })
            .catch(err => {
                  console.log(err);
                  res.status(500).json({ error: err });
            });
});


module.exports = projectRouter;