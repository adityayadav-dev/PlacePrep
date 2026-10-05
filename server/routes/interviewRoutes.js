const express = require('express');
const router = express.Router();
const { getQuestions, getQuestion, markCompleted } = require('../controllers/interviewController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getQuestions);
router.get('/:id', protect, getQuestion);
router.post('/:id/complete', protect, markCompleted);

module.exports = router;
