import { ORDER_SAVE_FAILED, ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS, ORDER_DETAILS_FAILED, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS,GET_MY_ORDERS_FAILED,GET_MY_ORDERS_REQUEST,GET_MY_ORDERS_SUCCESS, GET_ALL_ORDERS_REQUEST, GET_ALL_ORDERS_SUCCESS, GET_ALL_ORDERS_FAILED } from '../constants/orderConstants'

export const orderSaveReducer = (state = {}, action) => {
   switch (action.type) {
      case ORDER_SAVE_REQUEST:
         return { loading: true }
      case ORDER_SAVE_SUCCESS:
         return { loading: false, success: true, order: action.payload }
      case ORDER_SAVE_FAILED:
         return { loading: false, error: action.payload }
      default:
         return state
   }
}

export const getOrderByIdReducer=(state={loading:true,orderItems:[],shippingAddress:{}},action)=>{
   switch(action.type){
      case ORDER_DETAILS_REQUEST:
         return {...state,loading:true}
      case ORDER_DETAILS_SUCCESS :
         return {loading:false,order:action.payload}
      case ORDER_DETAILS_FAILED:
         return {loading:false,error:action.payload}
      default :
        return state;
   }
}

export const getMyOrderReducer=(state={},action)=>{
   switch(action.type){
      case GET_MY_ORDERS_REQUEST:
         return {loading:true}
      case GET_MY_ORDERS_SUCCESS:
         return {loading:false,myOrders:action.payload}
      case GET_MY_ORDERS_FAILED:
         return {loading:false,error:action.payload}
      default:
         return state
   }
}

export const getAllOrdersReducer=(state={},action)=>{
   switch(action.type){
      case GET_ALL_ORDERS_REQUEST:
         return {loading:true}
      case GET_ALL_ORDERS_SUCCESS:
         return {loading:false,allOrders:action.payload.orders,pages:action.payload.pages,page:action.payload.page}
      case GET_ALL_ORDERS_FAILED:
         return {loadig:false,error:action.payload}
      default :
        return state;
   }
}