const express = require('express');
const Project = require('../../models/project');
const CommentAndTime = require('../../models/comment_and_time');

const commentAndTimeRouter = express.Router();

commentAndTimeRouter.post('/addCommentAndTime', async (req, res) => {
      const { projectId, comment, time } = req.body;
      try {
            const project = await Project
                  .findOne({
                        _id: projectId
                  }).exec();
            if (project) {
                  const commentAndTime = new CommentAndTime({
                        comment: comment,
                        timeStamp: time,
                        projectId: projectId
                  });
                  await commentAndTime.save();
                  project.timeStampAndComment.push(commentAndTime);
                  await project.save();
                  res.status(200).send("Comment and Time Added");
            }
            else {
                  res.status(404).send({ error: "Project Not Found" });
            }
      }
      catch (error) {
            console.log(error);
            res.status(500).send({ error: error });
      }
});

commentAndTimeRouter.post('/deleteCommentAndTime', async(req, res) => {
      const { commentAndTimeId } = req.body;
      const commentAndTimeVar = await CommentAndTime.findOne({ _id: commentAndTimeId }).exec();
      console.log(commentAndTimeVar);
      if (commentAndTimeVar) {
            const projectId = commentAndTimeVar.projectId;
            const project = Project
                  .findOne({
                        _id: projectId
                  }).exec();
            if (project) {
                  console.log(projectId);
                  Project.updateOne({ _id: projectId }, { $pull: { timeStampAndComment: commentAndTimeId } }).exec();
            }
      }

      if (commentAndTimeId) {
            CommentAndTime.deleteOne({ _id: commentAndTimeId })
                  .then(() => {
                        res.status(200).send("Comment and Time Deleted");
                  })
                  .catch((error) => {
                        console.log(error);
                        res.status(500).send({ error: error });
                  })

      }

})


module.exports = commentAndTimeRouter;