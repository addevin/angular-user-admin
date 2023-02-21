
const authController = require('../controller/authController');
const { signupValidate, loginValidate } = require('../helpers/validation');
let router = require('express').Router()

router.post('/signup',signupValidate, authController.signup)
router.post('/login', loginValidate,  authController.login)
router.post('/admin', loginValidate,  authController.admin)


module.exports = router;