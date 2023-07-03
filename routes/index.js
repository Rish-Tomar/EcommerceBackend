const express =require('express')
const { createProducts } = require('../controllers/ProductController')

const Router=express.Router()

Router.get('/',(req,res)=>{
    return res.status(200).json({
        message:"Home Page"
    })
})

Router.use('/products',require('./ProductRoutes'))
Router.use('/brands',require('./Brands.js'))
Router.use('/categories',require('./Categories'))
Router.use('/users',require('./User'))
Router.use('/cart',require('./cart'))
Router.use('/auth',require('./Auth'))
Router.use('/orders',require('./Order'))
// Router.post('/create-products',createProducts)

module.exports = Router