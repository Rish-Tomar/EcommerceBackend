const { Product } = require("../models/Product");

module.exports.createProducts=async (req,res)=>{

    console.log(req.body)
    const product = await Product.create(req.body)    
    if(product){
        res.status(200).json(product)
    }
    else{
    res.status(400).json({
        message:"No sever found or product cannot be created"
    })
}
}

module.exports.fetchAllProducts = async (req,res)=>{
    // filter = {"category":["smartphone","laptops"]}
    // sort = {_sort:"price",_order="desc or asc"}
    // pagination = {_page:1,_limit=10}

    let allPrroducts = Product.find({deleted:{$ne:true}})
    let forCount =Product.find({})

    if(req.query.category){
        allPrroducts =  allPrroducts.find({"category":req.query.category})
        forCount =forCount.find({"category":req.query.category})
    }
    if(req.query.brand){
        allPrroducts =  allPrroducts.find({"brand":req.query.brand})
        forCount= forCount.find({"brand":req.query.brand})
    }
   
    if(req.query._page && req.query._limit){
        const pageSize=req.query._limit
        const page = req.query._page 
        allPrroducts= allPrroducts.skip(pageSize*(page-1)).limit(pageSize)
    }
    if(req.query._sort && req.query._order){
        allPrroducts =  allPrroducts.sort({[req.query._sort]:req.query._order})
    } 

    const totalDocs =await forCount.count().exec()

    try{
        const docs = await allPrroducts.exec()
        res.set('X-Total-Count',totalDocs)
        res.status(201).json(docs)
    }
    catch(error){
        res.status(400).json({
            message:'Error while fetching '
        })
    }
}

module.exports.fetchProductById =async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)

    }catch(err){
        res.status(400).json({
            message:"error while fetching products"
        })
    }
}

module.exports.updateProductById =async (req,res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(product)

    }catch(err){
        res.status(400).json({
            message:"error while updating product"
        })
    }
}