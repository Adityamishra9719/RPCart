import express from 'express';
import {
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrders,
    deleteOrders,
} from '../controllers/orderController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/authentication.js';

const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);

router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrders)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrders);

export default router;
