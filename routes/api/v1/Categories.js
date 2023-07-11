const { Router } = require("express");
const { fetchAllCategory, createCategory } = require("../../../controllers/api/v1/CategoryController");

const router=Router()

router.get('/',fetchAllCategory).post('/',createCategory)

module.exports=router