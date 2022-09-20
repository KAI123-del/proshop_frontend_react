
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_ITEM_INCREMENT, CART_ITEM_DECREMENT, CART_SAVE_PAYMENT_METHOD, CART_ITEM_RESET } from '../constants/cartConstants';
import { CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants';

export const addToCart = (data, qty) => async (dispatch, getState) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            qty: parseInt(qty),
            price: data.price,
            category: data.category,
            brand: data.brand,
            countInStock: data.countInStock,
            product: data._id || data.product
        }
    })


    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const removeItem = (id) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const increaseItem = (products) => (dispatch, getState) => {
    dispatch({ type: CART_ITEM_INCREMENT, payload: { ...products } })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const decreaseItem = (products) => (dispatch, getState) => {

    dispatch({ type: CART_ITEM_DECREMENT, payload: { ...products } })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const cartItemReset = () => (dispatch) => {
    dispatch({ type: CART_ITEM_RESET })
    localStorage.removeItem('cartItems')
}