const { Cart } = require("../../../models/Cart")

module.exports.addToCart =async(req,res)=>{
    const {id}=req.user
   try{
    const cart =await Cart.create({...req.body,user:id})
    const doc =await cart.populate('product')
    res.status(200).json(doc)
   }catch(err){
    res.status(400).json(err)
   }
}

module.exports.deleteFromCart =async(req,res)=>{
    try{
        const cart =await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json(cart)
    }catch(err){
        res.status(400).json(err)
    }
}

module.exports.updateCart =async(req,res)=>{
    try{
        console.log('cartController/updateCart',req.params.id)
        const cart =await Cart.findByIdAndUpdate(req.params.id,req.body,{new:true})
        const result =await cart.populate('product')
        console.log(result)
        res.status(200).json(result)
    }catch(err){
        res.status(400).json(err)
    }
}

module.exports.fetchCartByUser =async(req,res)=>{
    const {id} = req.user
    try{
    const cartItems =await Cart.find({user:id})  
        .populate('product')    // key value inside cart is product not Product, 
                                // we are not using any information of user so no need to populate user

    // console.log('cart fetched',cartItems)
    res.status(200).json(cartItems)
    }catch(err){
     res.status(402).json(err)
    }
 }