const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    product:{type:mongoose.Types.ObjectId, ref:'Product',require:true},
    quantity:{type:Number, required:true,default:1},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
})

const virtual = cartSchema.virtual('id')

virtual.get(()=>{
    return this._id
})

cartSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})

exports.Cart = mongoose.model('Cart',cartSchema)