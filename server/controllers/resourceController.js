const Resource = require('../models/Resource');

// @desc    Get all resources (with search/filter)
// @route   GET /api/resources
const getResources = async (req, res, next) => {
  try {
    const { category, type, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    const resources = await Resource.find(filter).sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    next(error);
  }
};

module.exports = { getResources };
