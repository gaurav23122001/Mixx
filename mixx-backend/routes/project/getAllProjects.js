const express = require('express');
const verify = require('../../middleware/verify');
const Project = require('../../models/project');
const User = require('../../models/user');

const getAllProjectsRouter = express.Router();

getAllProjectsRouter.get('/getAllProjects', async (req, res) => {
      const { userId } = req.body;
      // console.log(req.body);
      await User.findOne({ _id: userId })
            .then(async user => {
                  console.log(user);
                  // console.log(projects);
                  let allUserProject = [];
                  let projectCount = 0;
                  if (user.savedProjects.length === 0) {
                        res.status(500).send("NO Projects");
                  }
                  await user.savedProjects.forEach(async project => {
                        await Project.findOne({
                              _id: project
                        }).then(projectObj => {
                              let currentTime = new Date();
                              let timeDifference = currentTime - projectObj.creationTime;
                              console.log(timeDifference);
                              let timeDifferenceInMinutes = (timeDifference / 60000) / (24 * 60);
                              let newProjectObj = {
                                    "_id": projectObj._id,
                                    "name": projectObj.name,
                                    "description": projectObj.description,
                                    "audioURL": projectObj.audioURL,
                                    "audioFormat": projectObj.audioFormat,
                                    "timeStampAndComment": projectObj.timeStampAndComment,
                                    "user": projectObj.user,
                                    "creationTime": projectObj.creationTime,
                                    "__v": projectObj.__v,
                                    "timeDifferenceInMinutes": timeDifferenceInMinutes
                              }
                              allUserProject.push(newProjectObj);
                              projectCount++;
                              if (projectCount === user.savedProjects.length) {
                                    console.log(newProjectObj);
                                    // console.log(timeDifferenceInMinutes);
                                    res.status(200).json(allUserProject);
                              }
                        })
                  })
            }
            )
            .catch(err => {
                  console.log(err);
                  res.status(500).json({ error: err });
            }
            );
});


module.exports = getAllProjectsRouter;