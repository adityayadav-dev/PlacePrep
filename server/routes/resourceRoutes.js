const express = require('express');
const router = express.Router();
const { getResources } = require('../controllers/resourceController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getResources);

module.exports = router;
