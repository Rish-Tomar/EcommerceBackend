const { Router } = require("express");
const { fetchOrdersByUser, createOrder, deleteOrder, updateOrder, fetchAllOrders } = require("../../../controllers/api/v1/orderController");

const router=Router()

router.get('/',fetchOrdersByUser)
      .post('/add',createOrder)
      .delete('/:id',deleteOrder)
      .patch('/:id',updateOrder)
      .get('/admin/',fetchAllOrders)
module.exports=router