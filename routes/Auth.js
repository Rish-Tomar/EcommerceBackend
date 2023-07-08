const express = require("express");
const {  checkUserr } = require("../controllers/Auth");
const passport = require("passport");

Router =express.Router()

Router.get('/check',checkUserr)
module.exports = Router