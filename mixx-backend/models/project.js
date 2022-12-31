const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      description: {
            type: String,
            required: false
      },
      audio: {
            type: String,
            required: true
      },
      timeStampAndComment: {
            type: Array,
            required: false
      },
      user: {
            type: String,
            required: true
      }
});