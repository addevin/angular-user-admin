var express = require('express');
const adminController = require('../controller/adminCntroller');
const jwt = require('../helpers/jwt');
const validation = require('../helpers/validation');
var router = express.Router();

/* Routes. */
router.get('/getusers', jwt.verify, adminController.getusers);
router.get('/getuser/:id', jwt.verify, adminController.getuser);
router.put('/userupdate/:id', jwt.verify,  validation.userUpdateValidate,  adminController.updateUser);

module.exports = router;
