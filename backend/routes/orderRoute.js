const express = require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrders, deleteOrders } = require('../controllers/orderController');
const router = express.Router();
const{ isAuthenticatedUser,authorizeRoles} = require('../middleware/authentication');


router.route("/order/new").post(isAuthenticatedUser,newOrder);

router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser,myOrders);

router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);

router.route("/admin/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrders);

router.route("/admin/order/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrders);




module.exports = router;
