const express = require("express");
const {  checkUserr, logout, checkifLoggedIn } = require("../controllers/Auth");
const passport = require("passport");

Router =express.Router()

Router.get('/check',passport.authenticate('jwt'),checkUserr)
Router.get('/logout',passport.authenticate('jwt'),logout)
Router.get('/checkIfLoggedIn',checkifLoggedIn)
module.exports = Router