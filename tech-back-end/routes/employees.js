const router = require('express').Router();
const {
    index, getAllEmployees, addEmployee, deleteEmployee, getEmployeeById, updateEmployee, getAllEmployeesHours,
    getAllEmployeesAssignments, getAllEmployeeAssignments, getEmployeeAssignment, getAllEmployeesToAssignment, addAssignmentToEmployee, updateEmployeeToAssignment, deleteAssignmentToEmployee
} = require('./../controllers/employees-controller');
const { isAuthorized } = require('../middleware/authorization');

/**
 * Employee Routes
 */
router.get('/', isAuthorized, index);
router.get('/all', isAuthorized, getAllEmployees);
router.get('/all/hours', isAuthorized, getAllEmployeesHours);
router.get('/id/:id', isAuthorized, getEmployeeById);
router.post('/', isAuthorized, addEmployee);
router.put('/id/:id', isAuthorized, updateEmployee)
router.delete('/:id', isAuthorized, deleteEmployee);

/**
 * Employee Assignment Routes
 */
router.get('/all/assignments/all', isAuthorized, getAllEmployeesAssignments);
router.get('/:e_id/assignments/all', isAuthorized, getAllEmployeeAssignments);
router.get('/:e_id/assignment/ea_id/:ea_id', isAuthorized, getEmployeeAssignment);
router.get('/all/assignments/a_id/:a_id', isAuthorized, getAllEmployeesToAssignment);
router.post('/:e_id/assignments', isAuthorized, addAssignmentToEmployee);
router.put('/all/assignments/ea_id/:ea_id', isAuthorized, updateEmployeeToAssignment);
router.delete('/:e_id/assignments/ea_id/:ea_id', isAuthorized, deleteAssignmentToEmployee);
module.exports = router;