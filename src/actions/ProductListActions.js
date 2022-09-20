import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAILED,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAILED,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAILED,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAILED,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAILED,
    TOP_PRODUCT_REQUEST,
    TOP_PRODUCT_SUCCESS,
    TOP_PRODUCT_FAILED
} from '../constants/ProductConstants';
import axios from 'axios'

export const listProducts = (keyword = ' ', page = ' ') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/products?keyword=${keyword}&pageNumber=${page}`)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL, payload: error.response.data.message
        })
    }
}

export const productSummary = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/${id}`)
        dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: PRODUCT_DETAIL_FAILED, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}

export const productCreate = () => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/products`, {}, config);
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: PRODUCT_CREATE_FAILED, payload: error.response.data.message })
    }
}

export const productDelete = (productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/products/${productId}`, config)
        dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data.message })
        document.location.reload();
    } catch (error) {
        dispatch({ type: PRODUCT_DELETE_FAILED, payload: error.response.data.message })
    }
}

export const productUpdate = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/products/${product._id}`, product, config)
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: PRODUCT_UPDATE_FAILED, payload: error.response.data.message })
    }
}

export const createReview = (reviewData, productId) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/products/${productId}/reviews`, reviewData, config)

        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data })


    } catch (error) {
        dispatch({ type: PRODUCT_CREATE_REVIEW_FAILED, payload: error.response.data.message })
    }


}

export const productsTop = () => async (dispatch) => {
    try {
        dispatch({ type: TOP_PRODUCT_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/products/top`)
        dispatch({ type: TOP_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: TOP_PRODUCT_FAILED, payload: error.response.data.message })
    }
}