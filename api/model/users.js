const mongoose = require('mongoose');
const { validateEmail, hashPasswordvalidate } = require('../helpers/validation');

const userSchema = new mongoose.Schema(
    {   
        username: {type:String, required:true, unique:true, index: true, lowercase:true},
        name: {type:String, required:true, index: true},
        email: {type:String, required: true, unique:true , index: true},
        phone: {type:Number, required: true, unique:true, index: true},
        password: {type:String, required: true},
        avatar: {type:String},
        state:{
            deleted:{type:Boolean, default:false},
        },
        login_ses:  {type:String},
        joined:   {type:Date, default: Date.now()},
        last_login: {type:Date, default: Date.now},
        
    }
    // ,{timestamps:true}
)

let users = module.exports = mongoose.model("users", userSchema)

module.exports.getUser =  function(id){
    return users.findById(id)
}

module.exports.addUser = function (data){
    data.username = data.username.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
    let uNew = new users(data)
    return uNew.save()
}
module.exports.updateUser = function (id,data){
    if(data.username){
        data.username = data.username.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
    }
    return users.updateOne({_id:id},{$set:data})
}

module.exports.validateUser = async function(reqBody){
    try {
        let data = {};
        if(validateEmail(reqBody.user)){
            data.email = reqBody.user
        }else{
            data.username = reqBody.user
        }
        let uData = await users.findOne(data);
        if(uData){
            if(await hashPasswordvalidate(reqBody.password, uData.password)){
                return uData;
            }else{
                return false
            }
        }else{
            return false;
        }
    } catch (error) {
        console.log(error);
        return false
    }
}
module.exports.getAll = ()=>{
    return users.find({})
}
