const { Router } = require("express");
const { createProducts, fetchAllProducts, fetchProductById, updateProductById } = require("../controllers/ProductController");
const passport = require("passport");


const router=Router()


router.post('/create',createProducts)
router.get('/',isAuth,fetchAllProducts)
router.get('/:id',fetchProductById)
router.patch('/:id',updateProductById)

function isAuth(req,res,done){
    if(req.user){
        done()
    }else{
        res.sendStatus(403)
    }
}

module.exports=router