const { Router } = require("express");
const { fetchCartByUser, addToCart, deleteFromCart, updateCart } = require("../../../controllers/api/v1/cartController");
const passport = require("passport");

const router=Router()

router.get('/',isAuth(),fetchCartByUser)
      .post('/add',isAuth(),addToCart)
      .delete('/:id',isAuth(),deleteFromCart)
      .patch('/:id',isAuth(),updateCart)
module.exports=router

function isAuth(req,res,done){
      return passport.authenticate('jwt')
  }
