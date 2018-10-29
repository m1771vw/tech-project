const router = require('express').Router();
const {
     index, getAllStatusTypes, getStatusTypeById, addStatusType, updateStatusType, deleteStatusType 
} = require('./../controllers/statusTypes-controllers');

router.get('/', index);
router.get('/all', getAllStatusTypes);
router.get('/id/:id', getStatusTypeById);
router.post('/', addStatusType);
router.put('/:id', updateStatusType)
router.delete('/:id', deleteStatusType);


module.exports = router;