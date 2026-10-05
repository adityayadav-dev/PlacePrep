const InterviewQuestion = require('../models/InterviewQuestion');
const InterviewProgress = require('../models/InterviewProgress');

// @desc    Get all interview questions (with search/filter)
// @route   GET /api/interview
const getQuestions = async (req, res, next) => {
  try {
    const { category, difficulty, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (search) {
      filter.question = { $regex: search, $options: 'i' };
    }

    const questions = await InterviewQuestion.find(filter).sort({ createdAt: -1 });

    // Get completed status for current user
    const progress = await InterviewProgress.find({
      user: req.user._id,
      question: { $in: questions.map(q => q._id) },
      completed: true
    });
    const completedSet = new Set(progress.map(p => p.question.toString()));

    const result = questions.map(q => ({
      ...q.toObject(),
      completed: completedSet.has(q._id.toString())
    }));

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single interview question
// @route   GET /api/interview/:id
const getQuestion = async (req, res, next) => {
  try {
    const question = await InterviewQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const progress = await InterviewProgress.findOne({
      user: req.user._id,
      question: question._id
    });

    res.json({
      ...question.toObject(),
      completed: progress ? progress.completed : false
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark interview question as completed
// @route   POST /api/interview/:id/complete
const markCompleted = async (req, res, next) => {
  try {
    const question = await InterviewQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const progress = await InterviewProgress.findOneAndUpdate(
      { user: req.user._id, question: question._id },
      { completed: true },
      { upsert: true, new: true }
    );

    res.json({ message: 'Question marked as completed', progress });
  } catch (error) {
    next(error);
  }
};

module.exports = { getQuestions, getQuestion, markCompleted };
