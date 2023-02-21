const products = require('../helpers/products');
let users = require('../model/users')


let { check, validationResult } = require('express-validator');

let apiResponse = {
    message: 'Authentication Failed!',
    authenticated:false,
    status:401,
    data:{}
  }

  module.exports = {
    getusers:(req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
        apiRes.data.user = res.locals.jwtUSER
        apiRes.message = 'Error detected while trying to fetch data'
        apiRes.status = 401
        users.getAll().then((data)=>{
            apiRes.data.users = data
            apiRes.message = 'Users fetch success!'
            apiRes.status = 'ok'
        }).catch((err)=>{
            console.log(err);
            apiRes.message = 'Error detected while trying to fetch data'
            apiRes.status = 500
        }).then(()=>{
            res.json(apiRes);
        })

    },
    getuser:(req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
        apiRes.data.user = res.locals.jwtUSER
        apiRes.message = 'No id provided to fetch the user!'
        apiRes.status = 401
        if(req.params.id){
            users.getUser(req.params.id).then((data)=>{
                apiRes.data.userData = data
                apiRes.message = 'Users fetch success!'
                apiRes.status = 'ok'
            }).catch((err)=>{
                console.log(err);
                apiRes.message = 'Error detected while trying to fetch data'
                apiRes.status = 500
            }).then(()=>{
                res.json(apiRes);
            })
        }else{
            res.json(apiRes);
        }

    },
    updateUser:(req,res,next)=>{
        let apiRes = JSON.parse(JSON.stringify(apiResponse))
    apiRes.data.user = res.locals.jwtUSER
    apiRes.message = 'Invalid arguments, please check all input!'
    apiRes.status = 401
    apiRes.authenticated = true;
    let dataToUpdate = {
      canUpdate:false,
      data:{}
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      apiRes.message = errors.errors[0].param+(0)
      // return res.status(200).json(apiRes)
    }
    if(errors.errors.filter(e => e.param === 'email').length <= 0){
      dataToUpdate.canUpdate = true;
      dataToUpdate.data.email = req.body.email;
    }
    if(errors.errors.filter(e => e.param === 'username').length <= 0){
      dataToUpdate.canUpdate = true;
      dataToUpdate.data.username = req.body.username;
    }
    if(errors.errors.filter(e => e.param === 'name').length <= 0){
      dataToUpdate.canUpdate = true;
      dataToUpdate.data.name = req.body.name;
    }
    if(errors.errors.filter(e => e.param === 'phone').length <= 0){
      dataToUpdate.canUpdate = true;
      dataToUpdate.data.phone = req.body.phone;
    }
    if(errors.errors.filter(e => e.param === 'password').length <= 0){
      dataToUpdate.canUpdate = true;
      dataToUpdate.data.password = req.body.password;
    }else{
      if(req.body.password.length > 1){
        dataToUpdate.canUpdate = false;
        apiRes.message = "Password didn't match! try again.."
      }
    }

    if(dataToUpdate.canUpdate){
      users.updateUser(req.params.id,dataToUpdate.data).then((data)=>{
        apiRes.message = Object.keys(dataToUpdate.data).toString().replace(/,/g,', ')+(Object.keys(dataToUpdate.data).length>1?' are':'')+' updated successful!'
        apiRes.status = 'ok'

      }).catch((err)=>{
        console.log(err);
        apiRes.message = 'Error while updating profile!'
        if(err.code==11000){
          let exist = Object.keys(err.keyValue)[0]
          apiRes.message = `${exist} is already exist!`
        }
      }).then(()=>{
        res.status(200).json(apiRes)
      })
    }else{
      res.status(200).json(apiRes);
    }
    }
}