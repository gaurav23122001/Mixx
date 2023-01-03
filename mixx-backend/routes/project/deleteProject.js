const express = require('express');
const verify = require('../../middleware/verify');
const Project = require('../../models/project');

const deleteProjectRouter = express.Router();


const deleteProject = async (req, res) => {
      const { projectId } = req.body;
      try {
            const project = await Project
                  .findOne({
                        _id: projectId
                  }).exec();
            if (project) {
                  await project.deleteOne();
                  res.status(200).send("Project Deleted");
            }
            else {
                  res.status(404).send({ error: "Project Not Found" });
            }
      }
      catch (error) {
            console.log(error);
            res.status(500).send({ error: error });
      }
}


deleteProjectRouter.post('/delete', verify, (req, res) => {
      const { projectId } = req.body;
      if (projectId) {
            deleteProject(req, res);
      }
      else {
            res.status(400).send({ error: "Project Id is compulsory." });
      }
      console.log(req.body);
      res.status(200).send("Project Deleted");
});

module.exports = { deleteProjectRouter };