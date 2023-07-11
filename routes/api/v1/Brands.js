const { Router } = require("express");
const { fetchAllBrands, createBrand } = require('../../../controllers/api/v1/BrandController')

const router=Router()

router.get('/',fetchAllBrands).post('/',createBrand)

module.exports=router