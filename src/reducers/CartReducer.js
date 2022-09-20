import {
    CART_REMOVE_ITEM,
    CART_ADD_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_ITEM_RESET
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = { ...action.payload }
            const existItem = state.cartItems.find(x => x.product === item.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }

            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            let removableItem = action.payload
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== removableItem)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return { ...state, shippingAddress: action.payload }
        case CART_SAVE_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload }
        case CART_ITEM_RESET:
            return { cartItems: [], shippingAddress: { ...state.shippingAddress } }

        /** below reducers are not in use for now but if we want to add increment and decrement functionality on product quantity then we can unable it  */

        // case CART_ITEM_INCREMENT :
        //     let incrementItem = {...action.payload};
        //     const itemCheck=state.cartItems.find((x)=>x.product === incrementItem.product);
        //     if(itemCheck){
        //         incrementItem={
        //             ...incrementItem,
        //             qty:incrementItem.qty+1
        //         }

        //         return {
        //             ...state,
        //             cartItems:state.cartItems.map((x)=>x.product === incrementItem.product ? incrementItem : x)
        //         }

        //     }
        // case CART_ITEM_DECREMENT:
        //     let decrementItem={...action.payload}

        //     const itemToDecrement=state.cartItems.find((x)=>x.product===decrementItem.product)
        //     if(itemToDecrement){
        //         if(itemToDecrement.qty>1){
        //             decrementItem={
        //                 ...decrementItem,
        //                 qty:decrementItem.qty-=1
        //             }
        //             return{
        //                 ...state,
        //                 cartItems:state.cartItems.map((x)=>x.product===decrementItem.product?decrementItem:x)
        //             }
        //         }else{
        //             return {
        //                 ...state,
        //                 cartItems:state.cartItems.filter((x)=>x.product !== decrementItem.product)
        //             }
        //         }
        //     }
        default:
            return state
    }
}




// 


