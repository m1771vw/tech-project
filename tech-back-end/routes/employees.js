const router = require('express').Router();
const {
    index, getAllEmployees, addEmployee, deleteEmployee, getEmployeeById,
} = require('./../controllers/employees-controller');

router.get('/', index);
router.get('/all', getAllEmployees);
router.get('/:id', getEmployeeById);
router.post('/', addEmployee);
router.delete('/:id', deleteEmployee);


module.exports = router;