import {
    USER_LOGIN_FAILED,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAILED,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DETAIL_FAILED,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_UPDATE_PROFILE_FAILED,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USERLIST_REQUEST,
    USERLIST_SUCCESS,
    USERLIST_FAILED,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    ADMIN_UPDATE_USER_REQUEST,
    ADMIN_UPDATE_USER_SUCCESS,
    ADMIN_UPDATE_USER_FAILED,
    USER_BY_ID_REQUEST,
    USER_BY_ID_SUCCESS,
    USER_BY_ID_FAILED
} from '../constants/userConstants'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, { email, password }, config)

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {

        dispatch({
            type: USER_LOGIN_FAILED, payload: error.response.data.message
        })
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

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: USER_LOGOUT })
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/users`, { name, email, password }, config)

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

        toast.success(`Welcome Back ! ${data.name}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            className: "text-center"
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAILED, payload: error.response.data.message
        })
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

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAIL_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}`, config)

        dispatch({ type: USER_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAILED, payload: error.response.data.message
        })
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

export const updateProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
        const { userLogin: { userInfo } } = getState()


        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${userInfo.token}`
            }
        }


        const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/users/profile`, user, config)


        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))

        const customId = "custom-id-yes";
        toast.success("profile updated successfully", {
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
    } catch (error) {
        console.log("im here")
        dispatch({
            type: USER_UPDATE_PROFILE_FAILED, payload: error.response.data.message
        })
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

export const getUserList = (page=' ') => async (dispatch, getState) => {

    try {
        dispatch({ type: USERLIST_REQUEST })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/users?pageNumber=${page}`, config)
        console.log("data",data)
        dispatch({ type: USERLIST_SUCCESS, payload: data })
        


    } catch (error) {
        dispatch({ type: USERLIST_FAILED, payload: error.response.data.message })
    }
}

export const deleteUser = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DELETE_REQUEST })



        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, config)

        dispatch({ type: USER_DELETE_SUCCESS, payload: data })
        setTimeout(() => {
            document.location.reload();
        }, 2000)
    } catch (error) {
        dispatch({ type: USER_DETAIL_FAILED, payload: error.response.data.message })
    }

}

export const adminUserUpdate = (updateData, userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADMIN_UPDATE_USER_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, updateData, config)

        dispatch({ type: ADMIN_UPDATE_USER_SUCCESS, payload: data })


    } catch (error) {
        dispatch({ type: ADMIN_UPDATE_USER_FAILED, error: error.response.data.message })
    }
}

export const getUserById = (userId) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_BY_ID_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, config)
        dispatch({ type: USER_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: USER_BY_ID_FAILED, payload: error.response.data.message })
    }

}

