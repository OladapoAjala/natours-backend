const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

/**********
 * Check if ID is valid before passing on to other API route handlers
 * **********/
router.param('id', userController.checkID);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.patch(
  '/update-password',
  authController.protect,
  authController.updatePassword
);

/**********
 * API router for:
 *    get all user
 *    create user
 * **********/
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

/**********
 * API router for:
 *    get user by ID
 *    update user using ID
 *    delete user using ID
 * **********/
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
