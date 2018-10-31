const router = require('express').Router();
const {
    index, getAllAssignments, getAllBlockedAssignments, getAllAssignmentsOrdered, getAssignmentById, addAssignment, updateAssignment, deleteAssignment
} = require('./../controllers/assignments-controllers');
const { isAuthorized } = require('../middleware/authorization');

router.get('/', isAuthorized, index);
router.get('/all', isAuthorized, getAllAssignments);
router.get('/all/blocked', isAuthorized, getAllBlockedAssignments);
router.get('/all/ascending', isAuthorized, getAllAssignmentsOrdered);
router.get('/id/:id', isAuthorized, getAssignmentById);
router.post('/', isAuthorized, addAssignment);
router.put('/id/:id', isAuthorized, updateAssignment)
router.delete('/:id', isAuthorized, deleteAssignment);

module.exports = router;