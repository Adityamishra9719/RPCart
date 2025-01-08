import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
} from "../constants/orderConstants.js";

import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Create Order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        const { data } = await axios.post(`${BACKEND_URL}/api/v1/order/new`, order, config);

        console.log('Create Order Response:', data);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        console.error('Create Order Error:', error.response.data.message);
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// My Orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const config = {
            withCredentials: true,
        };
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/orders/me`, config);

        console.log('My Orders Response:', data);
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
        console.error('My Orders Error:', error.response.data.message);
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });

        const config = {
            withCredentials: true,
        };
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/orders`, config);

        console.log('Get All Orders Response:', data);
        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
        console.error('Get All Orders Error:', error.response.data.message);
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        const { data } = await axios.put(
            `${BACKEND_URL}/api/v1/admin/order/${id}`,
            order,
            config
        );

        console.log('Update Order Response:', data);
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
        console.error('Update Order Error:', error.response.data.message);
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });

        const config = {
            withCredentials: true,
        };
        const { data } = await axios.delete(`${BACKEND_URL}/api/v1/admin/order/${id}`, config);

        console.log('Delete Order Response:', data);
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
    } catch (error) {
        console.error('Delete Order Error:', error.response.data.message);
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const config = {
            withCredentials: true,
        };
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/order/${id}`, config);

        console.log('Get Order Details Response:', data);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error) {
        console.error('Get Order Details Error:', error.response.data.message);
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};