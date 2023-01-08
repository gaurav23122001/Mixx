const express = require('express');
const verify = require('../../middlewares/verify');
const Project = require('../../models/project');
const User = require('../../models/user');

const getAllCTT = express.Router();

getAllCTT.post('/getAllCTT', async (req, res) => {
      const { projectId } = req.body;
      console.log(req.body);
      await Project.findOne({ _id: projectId })
            .then(async project => {
                  console.log(project);
                  console.log(projectId);
                  let allCTT = [];
                  let CTTCount = 0;
                  if (project.timeStampAndComment.length == 0) {
                        let noProjects = []
                        res.status(200).send(noProjects);
                  }
                  project.timeStampAndComment.forEach(async projectNew => {
                        allCTT.push(projectNew);
                        CTTCount++;
                        if (CTTCount === project.timeStampAndComment.length) {
                              console.log(projectNew);
                              res.status(200).json(allCTT);
                        }
                  })
            }
            )
            .catch(err => {
                  console.log(err);
                  res.status(500).json({ error: err });
            }
            );
});


module.exports = getAllCTT;