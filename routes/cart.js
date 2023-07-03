const { Router } = require("express");
const { fetchCartByUser, addToCart, deleteFromCart, updateCart } = require("../controllers/cartController");

const router=Router()

router.get('/',fetchCartByUser)
      .post('/add',addToCart)
      .delete('/:id',deleteFromCart)
      .patch('/:id',updateCart)
module.exports=router