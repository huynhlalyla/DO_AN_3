const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');

router.post('/authenticate', userController.authenticateUser);
router.post('/auth/register',userController.registerUser);
router.post('/auth/login', userController.loginUser);
router.post('/change-password', userController.changePassword);
router.post('/update-profile', userController.updateUserProfile);
router.post('/auth/forgot-password', userController.requestPasswordReset);
router.post('/auth/verify-otp', userController.verifyResetOtp);
router.post('/auth/reset-password', userController.resetPasswordWithToken);
//them de test
// router.post('/add', userController.addUser);
// router.get('/getAll', userController.getAllUsers);

module.exports = router;
