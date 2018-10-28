const router = require('express').Router();
const {
    index, getAllEmployees, addEmployee, deleteEmployee, getEmployeeById, updateEmployee,
    getAllEmployeesAssignments, getAllEmployeeAssignments, getEmployeeAssignment, addAssignmentToEmployee, updateEmployeeToAssignment, deleteAssignmentToEmployee
} = require('./../controllers/employees-controller');

/**
 * Employee Routes
 */
router.get('/', index);
router.get('/all', getAllEmployees);
router.get('/id/:id', getEmployeeById);
router.post('/', addEmployee);
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee);

/**
 * Employee Assignment Routes
 */
router.get('/all/assignments/all', getAllEmployeesAssignments);
router.get('/:e_id/assignments/all', getAllEmployeeAssignments);
router.get('/:e_id/assignments/:ea_id', getEmployeeAssignment);
router.post('/:e_id/assignments', addAssignmentToEmployee);
router.put('/:e_id/assignments/:ea_id', updateEmployeeToAssignment);
router.delete('/:e_id/assignments/:ea_id', deleteAssignmentToEmployee);
module.exports = router;