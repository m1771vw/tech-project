const router            = require('express').Router();
const { index }         = require('./../controllers/employees-controller');

router.get('/', index);

module.exports = router;