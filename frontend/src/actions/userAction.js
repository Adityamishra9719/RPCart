import axios from "axios";
import {
    LOGIN_REQUESTS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUESTS,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from '../constants/UserConstants'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

//LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUESTS });
        console.log("Login request initiated");

        const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
        const { data } = await axios.post(`${BACKEND_URL}/api/v1/login`, { email, password }, config);

        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
        console.log("Login successful", data);

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
        console.error("Login failed", error.response.data.message);
    }
}

//REGISTER
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUESTS });
        console.log("Register request initiated");

        const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
        const { data } = await axios.post(`${BACKEND_URL}/api/v1/register`, userData, config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
        console.log("Register successful", data);

    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
        console.error("Register failed", error.response.data.message);
    }
}

//LOAD USER
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        console.log("Load user request initiated");

        const config = { withCredentials: true };
        const { data } = await axios.get(`${BACKEND_URL}/api/v1/me`, config);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
        console.log("Load user successful", data);

    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
        console.error("Load user failed", error.response.data.message);
    }
}

//Logout USER
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${BACKEND_URL}/api/v1/logout`, { withCredentials: true });

        dispatch({ type: LOGOUT_SUCCESS });
        console.log("Logout successful");

    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
        console.error("Logout failed", error.response.data.message);
    }
}

//UPDATE PROFILE
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        console.log("Update profile request initiated");

        const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
        const { data } = await axios.put(`${BACKEND_URL}/api/v1/me/update`, userData, config);

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
        console.log("Update profile successful", data.success);

    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message });
        console.error("Update profile failed", error.response.data.message);
    }
}

//UPDATE PASSWORD
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        console.log("Update password request initiated");

        const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
        const { data } = await axios.put(`${BACKEND_URL}/api/v1/password/update`, passwords, config);

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
        console.log("Update password successful", data.success);

    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
        console.error("Update password failed", error.response.data.message);
    }
}

//FORGOT PASSWORD
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        console.log("Forgot password request initiated");

        const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
        const { data } = await axios.post(`${BACKEND_URL}/api/v1/password/forgot`, email, config);

        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
        console.log("Forgot password successful", data.message);

    } catch (error) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
        console.error("Forgot password failed", error.response.data.message);
    }
}

//RESET PASSWORD
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        console.log("Reset password request initiated");

        const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
        const { data } = await axios.put(`${BACKEND_URL}/api/v1/password/reset/${token}`, passwords, config);

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
        console.log("Reset password successful", data.success);

    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });
        console.error("Reset password failed", error.response.data.message);
    }
}

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        console.log("Get all users request initiated");

        const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/users`, { withCredentials: true });

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
        console.log("Get all users successful", data.users);

    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
        console.error("Get all users failed", error.response.data.message);
    }
};

// get User Details
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        console.log("Get user details request initiated");

        const { data } = await axios.get(`${BACKEND_URL}/api/v1/admin/user/${id}`, { withCredentials: true });

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
        console.log("Get user details successful", data.user);

    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
        console.error("Get user details failed", error.response.data.message);
    }
};

// Update User
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        console.log("Update user request initiated");

        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        const { data } = await axios.put(`${BACKEND_URL}/api/v1/admin/user/${id}`, userData, config);

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
        console.log("Update user successful", data.success);

    } catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message });
        console.error("Update user failed", error.response.data.message);
    }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        console.log("Delete user request initiated");

        const { data } = await axios.delete(`${BACKEND_URL}/api/v1/admin/user/${id}`, { withCredentials: true });

        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
        console.log("Delete user successful", data);

    } catch (error) {
        dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.message });
        console.error("Delete user failed", error.response.data.message);
    }
};

//clearing errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
    console.log("Errors cleared");
}
