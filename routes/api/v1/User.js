const express = require("express");
const { fetchUserById, updateUserById } = require("../../../controllers/api/v1/UserController");
const { createUser, loginUser, checkUserr, logout } = require("../../../controllers/api/v1/Auth");
const passport = require("passport");

Router =express.Router()


Router.get('/getuser',isAuth(),fetchUserById)
      .patch('/:id',updateUserById)
      .post('/signup',createUser)
      .post('/login',passport.authenticate('local',{failureRedirect:'/signup'}),loginUser)
      // .post('/login',isAuth(),loginUser)
Router.get('/logout',logout)
module.exports = Router



function isAuth(req,res,done){
      return passport.authenticate('jwt')
  }