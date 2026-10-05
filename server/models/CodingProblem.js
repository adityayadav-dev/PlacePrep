const mongoose = require('mongoose');

const codingProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  },
  topic: {
    type: String,
    required: true,
    enum: ['Arrays', 'Strings', 'Binary Search', 'Linked List', 'Stack', 'Queue', 'Trees', 'Graphs', 'Dynamic Programming']
  },
  example: {
    type: String,
    default: ''
  },
  externalUrl: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('CodingProblem', codingProblemSchema);
