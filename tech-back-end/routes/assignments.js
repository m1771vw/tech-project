const router = require('express').Router();
const {
    index, getAllAssignments, getAllBlockedAssignments, getAllAssignmentsOrdered, getAssignmentById, addAssignment, updateAssignment, deleteAssignment,
    getAllAssignmentComments, addAssignmentComment, updateAssignmentComment, deleteAssignmentComment
} = require('./../controllers/assignments-controllers');
const { isAuthorized } = require('../middleware/authorization');


/**
 * Assignment Routers
 */
router.get('/', isAuthorized, index);
router.get('/all', isAuthorized, getAllAssignments);
router.get('/all/blocked', isAuthorized, getAllBlockedAssignments);
router.get('/all/ascending', isAuthorized, getAllAssignmentsOrdered);
router.get('/id/:id', isAuthorized, getAssignmentById);
router.post('/', isAuthorized, addAssignment);
router.put('/id/:id', isAuthorized, updateAssignment)
router.delete('/:id', isAuthorized, deleteAssignment);


/**
 * Assignment Comment Routers
 */
router.get('/id/:id/comments/all', isAuthorized, getAllAssignmentComments);
router.post('/id/:id/comments/', isAuthorized, addAssignmentComment);
router.put('/id/:id/comments/:cid', isAuthorized, updateAssignmentComment);
router.delete('/id/:id/comments/:cid', isAuthorized, deleteAssignmentComment);

module.exports = router;