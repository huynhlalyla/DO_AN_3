const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');

router.post('/authenticate', userController.authenticateUser);
router.post('/auth/register',userController.registerUser);
router.post('/auth/login', userController.loginUser);

//them de test
router.get('/add', userController.addUser);
router.get('/getAll', userController.getAllUsers);

module.exports = router;
