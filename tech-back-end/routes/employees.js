const router = require('express').Router();
const {
    index, getAllEmployees, addEmployee, deleteEmployee, getEmployeeById, updateEmployee,
} = require('./../controllers/employees-controller');

router.get('/', index);
router.get('/all', getAllEmployees);
router.get('/id/:id', getEmployeeById);
router.post('/', addEmployee);
router.put('/:id', updateEmployee)
router.delete('/:id', deleteEmployee);


module.exports = router;