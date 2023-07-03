const { User } = require("../models/User")

module.exports.createUser =async (req,res)=>{
    console.log("...",req.body)
    try{
        const user = await User.create(req.body)
        res.status(200).json(user)
    }catch(err){
        res.status(400).json({
            message:"error creating User",
            err
        })
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
        const user = await User.findOne({email:req.body.email}) 
        
                // res.status(201).json({
                //     name:user.name,
                //     email:user.email,
                //     id:user.id,
                //     addresses:user.addresses,
                //     orders:user.orders
                // })   
                res.status(201).json({                   
                    id:user.id,
                    role:user.role
                })     
}

module.exports.checkUserr =(req,res)=>{
   try{ console.log('check user',req.user.id)
    res.status(201).json(req.user)}
    catch(err){
        res.status(401).json(err)
    }
}