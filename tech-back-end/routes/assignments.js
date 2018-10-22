const router            = require('express').Router();
const { index }         = require('./../controllers/assignments-controllers');

router.get('/', index);

module.exports = router;