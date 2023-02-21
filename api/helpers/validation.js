let { check, validationResult } = require('express-validator');
let bcrypt = require('bcrypt')



  module.exports = {
    signupValidate : [
      check('username').isLength({ min: 4 }).trim().withMessage("is invalid, must contain minimum of 4 letters"),
      check('name').isLength({ min: 3 }).trim().withMessage("is invalid, must contain minimum of 3 letters"),
      check('email').isEmail().normalizeEmail().withMessage("is invalid, must be a valid format!").trim(),
      check('phone').isNumeric().trim().withMessage("is invalid, must be a valid ").isLength({ min: 8 }),
      check('password').isLength({ min: 8 }).withMessage('must be at least 8 chars long').trim().custom((value, { req }) => {
        if(value !== req.body.repassword) {
          return Promise.reject('didn\'t match, please recheck the password');
        }else{
          return Promise.resolve()
        }
      }),
    ],
    userUpdateValidate : [
      check('username')?.isLength({ min: 4 }).trim().withMessage("is invalid, must contain minimum of 4 letters"),
      check('name')?.isLength({ min: 3 }).trim().withMessage("is invalid, must contain minimum of 3 letters"),
      check('email')?.isEmail().normalizeEmail().withMessage("is invalid, must be a valid format!").trim(),
      check('phone')?.isNumeric().trim().withMessage("is invalid, must be a valid ").isLength({ min: 8 }),
      check('password')?.isLength({ min: 8 }).withMessage('must be at least 8 chars long').trim().custom((value, { req }) => {
        if(value !== req.body.repassword) {
          return Promise.reject('didn\'t match, please recheck the password');
        }else{
          return Promise.resolve()
        }
      }),
    ],
    loginValidate : [
      check('user').isLength({ min: 4 }).withMessage('Provided username or email is not valid!').trim(),
      check('password').isLength({ min: 8 }).withMessage('Provided password is not valid!').trim()
    ],
    validateEmail : (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    hashPassword:  (plaintextPassword)=>{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(plaintextPassword, salt);
        return hash
           
    },
    hashPasswordvalidate : async (plaintextPassword, hash)=> {
        const result = await bcrypt.compare(plaintextPassword, hash)
        return result;
    }
  }