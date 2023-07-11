const { Router } = require("express");
const { createProducts, fetchAllProducts, fetchProductById, updateProductById } =require('../../../controllers/api/v1/ProductController')
//  require("../../controllers/ProductController");
const passport = require("passport");


const router=Router()


router.post('/create',isAuth(),createProducts)
router.get('/',isAuth(),fetchAllProducts)
router.get('/:id',isAuth(),fetchProductById)
router.patch('/:id',isAuth(),updateProductById)

function isAuth(req,res,done){
    // if(req.user){
    //     done()
    // }else{
    //     res.sendStatus(403)
    // }
    return passport.authenticate('jwt')
}

module.exports=router