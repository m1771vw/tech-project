const router = require('express').Router();
const {
    index, getAllAssignments, getAssignmentById, addAssignment, updateAssignment, deleteAssignment
} = require('./../controllers/assignments-controllers');

router.get('/', index);
router.get('/all', getAllAssignments);
router.get('/id/:id', getAssignmentById);
router.post('/', addAssignment);
router.put('/:id', updateAssignment)
router.delete('/:id', deleteAssignment);

module.exports = router;