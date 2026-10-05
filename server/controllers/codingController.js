const CodingProblem = require('../models/CodingProblem');
const CodingProgress = require('../models/CodingProgress');

// @desc    Get all coding problems (with search/filter)
// @route   GET /api/coding
const getProblems = async (req, res, next) => {
  try {
    const { topic, difficulty, search } = req.query;
    const filter = {};
    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const problems = await CodingProblem.find(filter).sort({ createdAt: -1 });

    // Get solved status for current user
    const progress = await CodingProgress.find({
      user: req.user._id,
      problem: { $in: problems.map(p => p._id) },
      solved: true
    });
    const solvedSet = new Set(progress.map(p => p.problem.toString()));

    const result = problems.map(p => ({
      ...p.toObject(),
      solved: solvedSet.has(p._id.toString())
    }));

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single coding problem
// @route   GET /api/coding/:id
const getProblem = async (req, res, next) => {
  try {
    const problem = await CodingProblem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const progress = await CodingProgress.findOne({
      user: req.user._id,
      problem: problem._id
    });

    res.json({
      ...problem.toObject(),
      solved: progress ? progress.solved : false
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark a problem as solved
// @route   POST /api/coding/:id/complete
const markSolved = async (req, res, next) => {
  try {
    const problem = await CodingProblem.findById(req.params.id);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const progress = await CodingProgress.findOneAndUpdate(
      { user: req.user._id, problem: problem._id },
      { solved: true },
      { upsert: true, new: true }
    );

    res.json({ message: 'Problem marked as solved', progress });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProblems, getProblem, markSolved };
