const { Router } = require("express");
const { fetchAllCategory, createCategory } = require("../controllers/CategoryController");

const router=Router()

router.get('/',fetchAllCategory).post('/',createCategory)

module.exports=router