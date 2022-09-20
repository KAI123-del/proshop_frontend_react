import { ORDER_SAVE_FAILED, ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS, ORDER_DETAILS_FAILED, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, GET_MY_ORDERS_REQUEST, GET_MY_ORDERS_SUCCESS, GET_MY_ORDERS_FAILED, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ALL_ORDERS_FAILED } from '../constants/orderConstants';
import axios from 'axios'
import { toast } from 'react-toastify'


export const saveOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_SAVE_REQUEST })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/orders`, order, config)
        dispatch({ type: ORDER_SAVE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_SAVE_FAILED, payload: error.response.data.message })

        const customId = "custom-id-yes";
        toast.error(error.response.data.message, {
            position: "top-right",
            toastId: customId,
            autoClose: 2000,
            theme: "dark",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            className: "text-center"
        });
    }

}

export const getOrderById = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders/${id}`, config)

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAILED, payload: error.response.data.message })

        const customId = "custom-id-yes";
        toast.error(error.response.data.message, {
            position: "top-right",
            toastId: customId,
            autoClose: 2000,
            theme: "dark",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            className: "text-center"
        });
    }
}


export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_MY_ORDERS_REQUEST })

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders/userOrders`, config)
        dispatch({ type: GET_MY_ORDERS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_MY_ORDERS_FAILED, payload: error.response.data.message })

        const customId = "custom-id-yes";
        toast.error(error.response.data.message, {
            position: "top-right",
            toastId: customId,
            autoClose: 2000,
            theme: "dark",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            className: "text-center"
        });
    }
}

export const getAllOrders = (page=' ') => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ALL_ORDERS_REQUEST })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders?pageNumber=${page}`, config)
        dispatch({ type: GET_ALL_ORDERS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_ALL_ORDERS_FAILED, payload: error.response.message.data })
    }
}