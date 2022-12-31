const express = require('express');
const verify = require('../../middleware/verify');

const projectRouter = express.Router();

projectRouter.post('/create', verify, (req, res) => {
      console.log(req.body);
      res.status(200).send("Project Created");
})

module.exports = projectRouter;