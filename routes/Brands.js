const { Router } = require("express");
const { fetchAllBrands, createBrand } = require("../controllers/BrandController");

const router=Router()

router.get('/',fetchAllBrands).post('/',createBrand)

module.exports=router