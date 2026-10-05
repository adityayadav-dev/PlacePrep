const mongoose = require('mongoose');

const quizAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AptitudeQuestion'
  }],
  answers: {
    type: [Number],
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    default: 'Mixed'
  }
}, { timestamps: true });

module.exports = mongoose.model('QuizAttempt', quizAttemptSchema);
