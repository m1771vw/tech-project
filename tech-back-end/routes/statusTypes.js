const router = require('express').Router();
const {
     index, getAllStatusTypes, getStatusTypeById, addStatusType, updateStatusType, deleteStatusType 
} = require('./../controllers/statusTypes-controllers');
const { isAuthorized } = require('../middleware/authorization');

router.get('/', isAuthorized, index);
router.get('/all', isAuthorized, getAllStatusTypes);
router.get('/id/:id', isAuthorized, getStatusTypeById);
router.post('/', isAuthorized, addStatusType);
router.put('/:id', isAuthorized, updateStatusType)
router.delete('/:id', isAuthorized, deleteStatusType);


module.exports = router;