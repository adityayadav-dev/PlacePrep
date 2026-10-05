const mongoose = require('mongoose');

const interviewQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required']
  },
  answer: {
    type: String,
    required: [true, 'Answer is required']
  },
  category: {
    type: String,
    required: true,
    enum: ['HR', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'JavaScript', 'React', 'Node.js', 'DSA']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  }
}, { timestamps: true });

module.exports = mongoose.model('InterviewQuestion', interviewQuestionSchema);
