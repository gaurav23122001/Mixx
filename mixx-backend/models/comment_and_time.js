const mongoose = require('mongoose');

const comment_and_time_schema = new mongoose.Schema({
      projectId: {
            type: String,
            required: true
      },
      timeStamp: {
            type: Number,
            required: true
      },
      comment: {
            type: String,
            required: false
      },
      tags: {
            type: String,
            required: false
      }
});

module.exports = mongoose.model('Comment_and_Time', comment_and_time_schema);