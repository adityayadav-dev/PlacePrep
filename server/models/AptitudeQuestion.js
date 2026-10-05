const mongoose = require('mongoose');

const aptitudeQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question text is required']
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) { return v.length === 4; },
      message: 'Exactly 4 options are required'
    }
  },
  correctAnswer: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  },
  explanation: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Medium', 'Hard']
  }
}, { timestamps: true });

module.exports = mongoose.model('AptitudeQuestion', aptitudeQuestionSchema);
