const jwt = require("jsonwebtoken");
const { User } = require("../models/User")
const crypto =require('crypto')
const SECRET_Key ='SECRET_KEY'

// module.exports.createUser =async (req,res)=>{
//     console.log("...",req.body)
//     try{
//         const user = await User.create(req.body)
//         res.status(200).json(user)
//     }catch(err){
//         res.status(400).json({
//             message:"error creating User",
//             err
//         })
//     }
// }

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

// module.exports.loginUser1 =async (req,res)=>{
//     try{
//         const user = await User.findOne({email:req.body.email}) 
//         if(user){
//             if(user.password=== req.body.password){
//                 res.status(201).json({
//                     name:user.name,
//                     email:user.email,
//                     id:user.id
//                 })
//             }else{
//                 res.status(401).json({
//                     message:"Invalid email or Passord"
//                 })
//             }
//         }else{
//             res.status(401).json({message:"User wwwith this email Id not found"})
//         }        
//     }catch(err){
//         res.status(400).json({
//             message:"error",
//             err
//         })
//     }
// }

module.exports.loginUser =async (req,res)=>{
        // const user = await User.findOne({email:req.body.email})  
        //         res.status(201).json({                   
        //             id:user.id,
        //             role:user.role
        //         })
        res.cookie('jwt',req.user)
        res.status(201).json(req.user)
}

module.exports.checkUserr =(req,res)=>{
   try{ console.log('check user',req.user)
    res.status(201).json({status:"success",user:req.user})}
    catch(err){
        res.status(401).json(err)
    }
}