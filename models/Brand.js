const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    label: { type : String, required: true, unique: true},
    value: { type : String, required: true,unique: true},
})


// convert _id to id virtually, not in actual databse
const virtual = brandSchema.virtual('id')

virtual.get(()=>{
    return this._id
})

brandSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})

exports.Brand = mongoose.model('Brand',brandSchema)