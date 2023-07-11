const { Category } = require("../../../models/Category")

module.exports.fetchAllCategory=async(req,res)=>{
    try{
        const data=await Category.find({})
        res.status(200).json(data)

    }catch(err){
        res.status(400).json({
            message:"error in category"
        })

    }
}

module.exports.createCategory=async (req,res)=>{
    try{
        const data = await Category.create(req.body)
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({
            message:"error in category"
        })
    }
}