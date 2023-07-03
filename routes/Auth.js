const express = require("express");
const {  checkUserr } = require("../controllers/Auth");

Router =express.Router()

Router.get('/check',checkUserr)
module.exports = Router