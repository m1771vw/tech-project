const router = require('express').Router();
const {
    index, getAllAssignments, getAssignmentById, addAssignment, updateAssignment, deleteAssignment
} = require('./../controllers/assignments-controllers');
const { isAuthenticated } = require('../middleware/passport');
const { isAuthorized } = require('../middleware/authorization');
router.get('/', index);
router.get('/all', isAuthorized, getAllAssignments);
router.get('/id/:id', getAssignmentById);
router.post('/', addAssignment);
router.put('/:id', updateAssignment)
router.delete('/:id', deleteAssignment);

module.exports = router;