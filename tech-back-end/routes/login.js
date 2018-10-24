const router            = require('express').Router();
const { login, signup, getAllUsers, deleteUser, updateUser }         = require('./../controllers/login-controllers');

router.post('/login', login);
router.post('/signup', signup);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);
router.put('/user/:id', updateUser);
module.exports = router;