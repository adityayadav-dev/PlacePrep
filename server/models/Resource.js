const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['Aptitude', 'Coding', 'Interview', 'General']
  },
  type: {
    type: String,
    required: true,
    enum: ['Article', 'Video', 'PDF', 'Website']
  },
  url: {
    type: String,
    required: [true, 'URL is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
