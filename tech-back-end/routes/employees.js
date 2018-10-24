const router            = require('express').Router();
const { index, getAllEmployees, addEmployee }         = require('./../controllers/employees-controller');

router.get('/', index);
router.get('/all', getAllEmployees);
router.post('/', addEmployee);


module.exports = router;