const express = require("express");
const {  checkUserr, logout } = require("../../../controllers/api/v1/Auth");
const passport = require("passport");
const { checkifLoggedIn } = require("../../../controllers/Auth");

Router =express.Router()

// Router.get('/check',passport.authenticate('jwt'),checkUserr)
Router.get('/logout',passport.authenticate('jwt'),logout)
Router.get('/checkIfLoggedIn',checkifLoggedIn)
module.exports = Router