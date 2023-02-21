let { check, validationResult } = require('express-validator');
const jwt = require('../helpers/jwt');
const { hashPassword } = require('../helpers/validation');
const { addUser, getUser, validateUser } = require('../model/users')
module.exports= {
  signup:(req,res,next)=>{
      let response = {
          message: 'Something went wrong!',
          status:'error',
          data:{}
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        response.message = errors.errors[0].param+" "+((errors.errors[0].msg=="Invalid value")?"is invalid, please check the value!":errors.errors[0].msg);
        return res.status(200).json(response);
      }
      console.log(req.body);
      addUser({
          username: req.body.username.replace(/[ ]+/g,'_'),
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: hashPassword(req.body.password),
    }).then((data)=>{
      console.log(data,"Database Result after adding!!!!");
      let token = jwt.sign({
        _id:data._id,
        username:data.username
      })
      response.data.token = token;
      response.message = 'Account Created Successful!'
      response.status = 'ok';
    }).catch((err)=>{
      response.message = 'Authentication error!'
      if(err.code==11000){
          let exist = Object.keys(err.keyValue)[0]
          response.message = `${exist} is already exist!`
      }
      console.log(err);
    }).then(()=>{
      res.json(response)
    })
    
  },
  login:async (req,res,next)=>{
    let response = {
      message: 'Authentication Failed!',
      status:401,
      data:{}
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      response.message = (errors.errors[0].msg=="Invalid value")?errors.errors[0].param+" is invalid, please check the value!":errors.errors[0].msg
      return res.status(200).json(response)
    }
    let uData = await validateUser(req.body); //false or userdata
    if(uData){
      let token = jwt.sign({
        _id:uData._id,
        username:uData.username
      })
      response.data.token = token;
      response.message = 'Login Successful!'
      response.status = 'ok';
      return res.json(response)
    }else{
      return res.status(200).json(response)
    }
  },
  admin:(req,res,next)=>{
    let response = {
      message: 'Authentication Failed!',
      status:401,
      data:{}
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      response.message = (errors.errors[0].msg=="Invalid value")?errors.errors[0].param+" is invalid, please check the value!":errors.errors[0].msg
      return res.status(200).json(response)
    }
    let admin = {
      username:process.env.AUTH_ADMIN_USER,
      password:process.env.AUTH_ADMIN_PASSWORD
    }
    if( admin.username== req.body.user &&  admin.password == req.body.password){
      let token = jwt.sign({
        username:admin.username
      })
      response.data.token = token;
      response.message = 'Login Successful!'
      response.status = 'ok';
      return res.json(response)
    }else{
      return res.status(200).json(response)
    }
  }
}