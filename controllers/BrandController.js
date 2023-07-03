const { Brand } = require("../models/Brand")

module.exports.fetchAllBrands =async(req,res)=>{
    try{
        const brands=await Brand.find({})
        res.status(200).json(brands)

    }catch(err){
        res.status(400).json({
            message:"error fetching brands"
        })

    }
}

module.exports.createBrand=async(req,res)=>{
    try{
        const data = await Brand.create(req.body)
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({
            message:"error creating Brand"
        })
    }
}