const AptitudeQuestion = require('../models/AptitudeQuestion');
const QuizAttempt = require('../models/QuizAttempt');

// @desc    Get aptitude questions (with optional category/difficulty filter)
// @route   GET /api/aptitude/questions
const getQuestions = async (req, res, next) => {
  try {
    const { category, difficulty } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await AptitudeQuestion.find(filter);
    res.json(questions);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single aptitude question
// @route   GET /api/aptitude/questions/:id
const getQuestion = async (req, res, next) => {
  try {
    const question = await AptitudeQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    next(error);
  }
};

// @desc    Start a quiz — returns 10 random questions for a category
// @route   GET /api/aptitude/quiz
const startQuiz = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category && category !== 'Mixed') filter.category = category;

    const questions = await AptitudeQuestion.aggregate([
      { $match: filter },
      { $sample: { size: 10 } }
    ]);

    res.json(questions);
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a quiz attempt
// @route   POST /api/aptitude/attempt
const submitAttempt = async (req, res, next) => {
  try {
    const { questions, answers, category } = req.body;

    if (!questions || !answers || questions.length !== answers.length) {
      return res.status(400).json({ message: 'Invalid quiz submission' });
    }

    // Fetch the actual questions to calculate score
    const questionDocs = await AptitudeQuestion.find({ _id: { $in: questions } });
    const questionMap = {};
    questionDocs.forEach(q => { questionMap[q._id.toString()] = q; });

    let score = 0;
    const results = questions.map((qId, index) => {
      const q = questionMap[qId];
      const isCorrect = q && answers[index] === q.correctAnswer;
      if (isCorrect) score++;
      return {
        question: q ? q.question : '',
        options: q ? q.options : [],
        correctAnswer: q ? q.correctAnswer : 0,
        selectedAnswer: answers[index],
        isCorrect,
        explanation: q ? q.explanation : ''
      };
    });

    const attempt = await QuizAttempt.create({
      user: req.user._id,
      questions,
      answers,
      score,
      total: questions.length,
      category: category || 'Mixed'
    });

    res.status(201).json({
      _id: attempt._id,
      score,
      total: questions.length,
      results
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get quiz history
// @route   GET /api/aptitude/history
const getHistory = async (req, res, next) => {
  try {
    const attempts = await QuizAttempt.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('questions', 'question options correctAnswer explanation category');

    res.json(attempts);
  } catch (error) {
    next(error);
  }
};

module.exports = { getQuestions, getQuestion, startQuiz, submitAttempt, getHistory };
