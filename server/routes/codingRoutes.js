const express = require('express');
const router = express.Router();
const { getProblems, getProblem, markSolved } = require('../controllers/codingController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getProblems);
router.get('/:id', protect, getProblem);
router.post('/:id/complete', protect, markSolved);

module.exports = router;
