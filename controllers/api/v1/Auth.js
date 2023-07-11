const jwt = require("jsonwebtoken");
const crypto =require('crypto');
const { User } = require("../../../models/User");
const SECRET_Key ='SECRET_KEY'

module.exports.createUser =async (req,res)=>{
   try{
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
        req.body.password,
        salt,
        310000,
        32,
        'sha256',
        async function(err, hashedPassword) {
            if (err) { return next(err); }
            const newUser = await User.create({...req.body,password:hashedPassword,salt})
            if(newUser){
                req.login(newUser, function(err) {
                    if (err) { 
                        res.status(400).json(err) 
                    }else{     
                        const token = jwt.sign({id:newUser.id,role:newUser.role}, SECRET_Key);
                        res.cookie('jwt',token)
                        res.status(201).json(token)
                    }
                });
            }
        }
    )
   }catch(err){
    res.status(400).json(err)
   }
}


module.exports.loginUser =async (req,res)=>{
        res.cookie('jwt',req.user)
        res.status(201).json(req.user)
}

module.exports.checkUserr =(req,res)=>{
   try{ 
    console.log('auth.js/check user',req.user)
    res.status(201).json({status:"success",user:req.user})}
    catch(err){
        res.status(401).json(err)
    }
}

module.exports.logout =(req,res)=>{
    try{
        req.logout()
        res.status(200).json({
            message:"Logged Out"
        })
    }catch(err){
        res.sendStatus(401)
    }
}