const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  createAptitude, updateAptitude, deleteAptitude,
  createCoding, updateCoding, deleteCoding,
  createInterview, updateInterview, deleteInterview,
  createResource, updateResource, deleteResource
} = require('../controllers/adminController');

// All admin routes require auth + admin role
router.use(protect, admin);

// Aptitude CRUD
router.post('/aptitude', createAptitude);
router.put('/aptitude/:id', updateAptitude);
router.delete('/aptitude/:id', deleteAptitude);

// Coding CRUD
router.post('/coding', createCoding);
router.put('/coding/:id', updateCoding);
router.delete('/coding/:id', deleteCoding);

// Interview CRUD
router.post('/interview', createInterview);
router.put('/interview/:id', updateInterview);
router.delete('/interview/:id', deleteInterview);

// Resources CRUD
router.post('/resources', createResource);
router.put('/resources/:id', updateResource);
router.delete('/resources/:id', deleteResource);

module.exports = router;
