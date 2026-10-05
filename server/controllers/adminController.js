const AptitudeQuestion = require('../models/AptitudeQuestion');
const CodingProblem = require('../models/CodingProblem');
const InterviewQuestion = require('../models/InterviewQuestion');
const Resource = require('../models/Resource');

// ========== APTITUDE ==========
const createAptitude = async (req, res, next) => {
  try {
    const question = await AptitudeQuestion.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
};

const updateAptitude = async (req, res, next) => {
  try {
    const question = await AptitudeQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
  } catch (error) {
    next(error);
  }
};

const deleteAptitude = async (req, res, next) => {
  try {
    const question = await AptitudeQuestion.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json({ message: 'Question deleted' });
  } catch (error) {
    next(error);
  }
};

// ========== CODING ==========
const createCoding = async (req, res, next) => {
  try {
    const problem = await CodingProblem.create(req.body);
    res.status(201).json(problem);
  } catch (error) {
    next(error);
  }
};

const updateCoding = async (req, res, next) => {
  try {
    const problem = await CodingProblem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json(problem);
  } catch (error) {
    next(error);
  }
};

const deleteCoding = async (req, res, next) => {
  try {
    const problem = await CodingProblem.findByIdAndDelete(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json({ message: 'Problem deleted' });
  } catch (error) {
    next(error);
  }
};

// ========== INTERVIEW ==========
const createInterview = async (req, res, next) => {
  try {
    const question = await InterviewQuestion.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    next(error);
  }
};

const updateInterview = async (req, res, next) => {
  try {
    const question = await InterviewQuestion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
  } catch (error) {
    next(error);
  }
};

const deleteInterview = async (req, res, next) => {
  try {
    const question = await InterviewQuestion.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json({ message: 'Question deleted' });
  } catch (error) {
    next(error);
  }
};

// ========== RESOURCES ==========
const createResource = async (req, res, next) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (error) {
    next(error);
  }
};

const updateResource = async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json(resource);
  } catch (error) {
    next(error);
  }
};

const deleteResource = async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAptitude, updateAptitude, deleteAptitude,
  createCoding, updateCoding, deleteCoding,
  createInterview, updateInterview, deleteInterview,
  createResource, updateResource, deleteResource
};
