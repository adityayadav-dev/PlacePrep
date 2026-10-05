const mongoose = require('mongoose');

const codingProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CodingProblem',
    required: true
  },
  solved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

codingProgressSchema.index({ user: 1, problem: 1 }, { unique: true });

module.exports = mongoose.model('CodingProgress', codingProgressSchema);
