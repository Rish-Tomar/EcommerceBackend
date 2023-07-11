const express = require("express");
const { fetchUserById, updateUserById } = require("../controllers/UserController");
const { createUser, loginUser, checkUserr } = require("../controllers/Auth");
const passport = require("passport");

Router =express.Router()


Router.get('/getuser',isAuth(),fetchUserById)
      .patch('/:id',updateUserById)
      .post('/signup',createUser)
      .post('/login',passport.authenticate('local',{failureRedirect:'/signup'}),loginUser)
module.exports = Router



function isAuth(req,res,done){
      return passport.authenticate('jwt',{failureRedirect:'/signup'})
  }