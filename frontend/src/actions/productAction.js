import axios from "axios";
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUESTS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS
} from "../constants/productConstants";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const config = {
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
};

// Get All Products
export const getProduct =
    (keyword = "", currentPage = 1, price = [0, 30000], category, ratings = 0) =>
        async (dispatch) => {
            try {
                console.log("Dispatching ALL_PRODUCT_REQUEST");
                dispatch({ type: ALL_PRODUCT_REQUEST });

                let link = `${BACKEND_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

                if (category) {
                    link = `${BACKEND_URL}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]==${price[1]}&category=${category}&ratings[gte]=${ratings}`;
                }

                console.log("Fetching products from:", link);
                const { data } = await axios.get(link, { withCredentials: true });

                console.log("Dispatching ALL_PRODUCT_SUCCESS with payload:", data);
                dispatch({
                    type: ALL_PRODUCT_SUCCESS,
                    payload: data,
                });
            } catch (error) {
                console.error("Error fetching products:", error.response.data.message);
                dispatch({
                    type: ALL_PRODUCT_FAIL,
                    payload: error.response.data.message,
                });
            }
        };

// Get All Products For Admin
export const getAdminProduct = () => async (dispatch) => {
    try {
        console.log("Dispatching ADMIN_PRODUCT_REQUEST");
        dispatch({ type: ADMIN_PRODUCT_REQUEST });

        const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/products`, { withCredentials: true });

        console.log("Dispatching ADMIN_PRODUCT_SUCCESS with payload:", data.products);
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        console.error("Error fetching admin products:", error.response.data.message);
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
    try {
        console.log("Dispatching NEW_PRODUCT_REQUEST");
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const { data } = await axios.post(
            `${BACKEND_URL}/api/v1/admin/product/new`,
            productData,
            config
        );

        console.log("Dispatching NEW_PRODUCT_SUCCESS with payload:", data);
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error("Error creating product:", error.response.data.message);
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        console.log("Dispatching UPDATE_PRODUCT_REQUEST");
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const { data } = await axios.put(
            `${BACKEND_URL}/api/v1/admin/product/${id}`,
            productData,
            config
        );

        console.log("Dispatching UPDATE_PRODUCT_SUCCESS with payload:", data.success);
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        console.error("Error updating product:", error.response.data.message);
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        console.log("Dispatching DELETE_PRODUCT_REQUEST");
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await axios.delete(`${BACKEND_URL}/api/v1/admin/product/${id}`, { withCredentials: true });

        console.log("Dispatching DELETE_PRODUCT_SUCCESS with payload:", data.success);
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        console.error("Error deleting product:", error.response.data.message);
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Products Details
export const getProductDetails = (id) => async (dispatch) => {
    try {
        console.log("Dispatching PRODUCT_DETAILS_REQUESTS");
        dispatch({ type: PRODUCT_DETAILS_REQUESTS });

        const { data } = await axios.get(`${BACKEND_URL}/api/v1/product/${id}`, { withCredentials: true });

        console.log("Dispatching PRODUCT_DETAILS_SUCCESS with payload:", data.product);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        })

    } catch (error) {
        console.error("Error fetching product details:", error.response.data.message);
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
    try {
        console.log("Dispatching NEW_REVIEW_REQUEST");
        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            withCredentials: true
        };

        const { data } = await axios.put(`${BACKEND_URL}/api/v1/review`, reviewData, config);

        console.log("Dispatching NEW_REVIEW_SUCCESS with payload:", data.success);
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        console.error("Error submitting review:", error.response.data.message);
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Reviews of a Product
export const getAllReviews = (id) => async (dispatch) => {
    try {
        console.log("Dispatching ALL_REVIEW_REQUEST");
        dispatch({ type: ALL_REVIEW_REQUEST });

        const { data } = await axios.get(`${BACKEND_URL}/api/v1/reviews?id=${id}`, { withCredentials: true });

        console.log("Dispatching ALL_REVIEW_SUCCESS with payload:", data.reviews);
        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews,
        });
    } catch (error) {
        console.error("Error fetching reviews:", error.response.data.message);
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Review of a Product
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
        console.log("Dispatching DELETE_REVIEW_REQUEST");
        dispatch({ type: DELETE_REVIEW_REQUEST });

        const { data } = await axios.delete(
            `${BACKEND_URL}/api/v1/reviews?id=${reviewId}&productId=${productId}`,
            { withCredentials: true }
        );

        console.log("Dispatching DELETE_REVIEW_SUCCESS with payload:", data.success);
        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        console.error("Error deleting review:", error.response.data.message);
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

//clearing errors
export const clearErrors = () => async (dispatch) => {
    console.log("Dispatching CLEAR_ERRORS");
    dispatch({ type: CLEAR_ERRORS });
}