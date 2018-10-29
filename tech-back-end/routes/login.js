const router            = require('express').Router();
const { login, signup, getAllUsers, deleteUser, updateUser }         = require('./../controllers/login-controllers');
const { isAuthenticated } = require('../middleware/passport');
const { isAuthorized } = require('../middleware/authorization');

router.post('/login', isAuthenticated, login);
router.post('/signup', isAuthorized, signup);
router.get('/users', isAuthorized, getAllUsers);
router.delete('/users/:id', isAuthorized, deleteUser);
router.put('/user/:id', isAuthorized, updateUser);
module.exports = router;