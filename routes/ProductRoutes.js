const { Router } = require("express");
const { createProducts, fetchAllProducts, fetchProductById, updateProductById } = require("../controllers/ProductController");


const router=Router()


router.post('/create',createProducts)
router.get('/',fetchAllProducts)
router.get('/:id',fetchProductById)
router.patch('/:id',updateProductById)

module.exports=router