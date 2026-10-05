const QuizAttempt = require('../models/QuizAttempt');
const CodingProgress = require('../models/CodingProgress');
const InterviewProgress = require('../models/InterviewProgress');
const AptitudeQuestion = require('../models/AptitudeQuestion');
const CodingProblem = require('../models/CodingProblem');
const InterviewQuestion = require('../models/InterviewQuestion');

// @desc    Get dashboard stats for logged-in student
// @route   GET /api/dashboard
const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Aptitude stats
    const quizAttempts = await QuizAttempt.find({ user: userId });
    const totalQuizzes = quizAttempts.length;
    const avgScore = totalQuizzes > 0
      ? Math.round(quizAttempts.reduce((sum, a) => sum + (a.score / a.total) * 100, 0) / totalQuizzes)
      : 0;

    // Coding stats
    const codingSolved = await CodingProgress.countDocuments({ user: userId, solved: true });
    const totalCodingProblems = await CodingProblem.countDocuments();

    // Interview stats
    const interviewCompleted = await InterviewProgress.countDocuments({ user: userId, completed: true });
    const totalInterviewQuestions = await InterviewQuestion.countDocuments();

    // Total aptitude questions
    const totalAptitudeQuestions = await AptitudeQuestion.countDocuments();

    // Overall progress
    const totalItems = totalCodingProblems + totalInterviewQuestions + (totalQuizzes > 0 ? totalQuizzes : 0);
    const completedItems = codingSolved + interviewCompleted + totalQuizzes;
    const overallProgress = totalItems > 0 ? Math.round((completedItems / (totalCodingProblems + totalInterviewQuestions + 10)) * 100) : 0;

    // Recent attempts
    const recentAttempts = await QuizAttempt.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('score total category createdAt');

    res.json({
      aptitude: {
        quizzesCompleted: totalQuizzes,
        averageScore: avgScore,
        totalQuestions: totalAptitudeQuestions
      },
      coding: {
        solved: codingSolved,
        total: totalCodingProblems
      },
      interview: {
        completed: interviewCompleted,
        total: totalInterviewQuestions
      },
      overallProgress: Math.min(overallProgress, 100),
      recentAttempts
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboard };
