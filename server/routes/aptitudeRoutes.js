const express = require('express');
const router = express.Router();
const { getQuestions, getQuestion, startQuiz, submitAttempt, getHistory } = require('../controllers/aptitudeController');
const { protect } = require('../middleware/auth');

router.get('/questions', protect, getQuestions);
router.get('/questions/:id', protect, getQuestion);
router.get('/quiz', protect, startQuiz);
router.post('/attempt', protect, submitAttempt);
router.get('/history', protect, getHistory);

module.exports = router;
