const mongoose = require('mongoose');

const interviewProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InterviewQuestion',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

interviewProgressSchema.index({ user: 1, question: 1 }, { unique: true });

module.exports = mongoose.model('InterviewProgress', interviewProgressSchema);
