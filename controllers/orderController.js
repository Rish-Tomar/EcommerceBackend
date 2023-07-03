const { Order } = require("../models/Order")

module.exports.fetchOrdersByUser =async(req,res)=>{
    const {user}=req.query
    try{
        console.log('orderController/fetchOrderByuser',req.query.user)
        const orders =await Order.find({user:user})
        console.log('Orders',orders)
        res.status(200).json(orders)
    }catch(err){
        res.status(400).json(err)
    }
}


module.exports.createOrder=async(req,res)=>{
    console.log("createOrder/OrederController",req.body)
    try{
        const order =await Order.create(req.body)
        res.status(200).json(order)
    }catch(err){
        console.log("yaha tak to aya")
        res.status(400).json(err)
    }
}

module.exports.deleteOrder=async(req,res)=>{
    try{
        const order =await Order.findByIdAndDelete(req.body)
        res.status(200).json(order)
    }catch(err){
        res.status(400).json(err)
    }
}

module.exports.updateOrder =async(req,res)=>{
    try{
        const order =await Order.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(order)
    }catch(err){
        res.status(400).json(err)
    }
}


module.exports.fetchAllOrders = async (req,res)=>{

    let allOrders = Order.find({deleted:{$ne:true}})
    let forCount =Order.find({deleted:{$ne:true}})
   
    if(req.query._sort && req.query._order){
        allOrders=  allOrders.sort({[req.query._sort]:req.query._order})
    } 
    const totalDocs =await forCount.count().exec()

    if(req.query._page && req.query._limit){
        const pageSize=req.query._limit
        const page = req.query._page 
        allOrders= allOrders.skip(pageSize*(page-1)).limit(pageSize)
    }

    try{
        const docs = await allOrders.exec()
        res.set('X-Total-Count',totalDocs)
        res.status(201).json(docs)
    }
    catch(error){
        res.status(400).json({
            message:'Error while fetching '
        })
    }
}