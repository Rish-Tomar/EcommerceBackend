const { User } = require("../models/User")



module.exports.fetchUserById =async (req,res)=>{
    try{
        const user= await User.findById(req.params.id,'name email addresses orders')
        res.status(200).json(user)

    }catch(err){
        res.status(400).json({
            message:"error while fetching user"
        })
    }
}


module.exports.updateUserById =async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(user)
    }catch(err){
        res.status(400).json({
            message:"error while updating User"
        })
    }
}