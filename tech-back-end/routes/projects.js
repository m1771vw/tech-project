const router            = require('express').Router();
const { index }         = require('./../controllers/projects-controllers');

router.get('/', index);

module.exports = router;