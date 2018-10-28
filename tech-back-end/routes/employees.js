const router = require('express').Router();
const {
    index, getAllEmployees, addEmployee, deleteEmployee, getEmployeeById, updateEmployee,
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
// router.get('/all/assignments/all', getAllEmployeesAssignments);
// router.get('/:eid/assignments/all', getAllEmployeeAssignments);
// router.get('/:eid/assignments/:eaid', getEmployeeAssignment);
// router.post('/:eid/assignment', addAssignmentToEmployee);
// router.put('/:eid/assignments/:eaid', updateAssignmentToEmployee);
// router.delete('/:eid/assignments/:eaid', deleteAssignmentToEmployee);
module.exports = router;