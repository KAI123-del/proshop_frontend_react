import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, updateProductReducer, deleteProductReducer, productCreateReducer,createReviewReducer ,topProductsReducer} from './reducers/ProductReducers'
import { cartReducer } from './reducers/CartReducer';
import { userLoginReducer, userRegisterReducer, getUserReducer, updateUserProfileReducer, getUserListReducer, deleteUserReducer, adminUserUpdateReducer, getUserByIdReducer } from './reducers/userReducer'
import { orderSaveReducer, getOrderByIdReducer, getMyOrderReducer ,getAllOrdersReducer} from './reducers/orderReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailsReducer,
    updateProduct: updateProductReducer,
    deleteProduct: deleteProductReducer,
    createProduct: productCreateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: getUserReducer,
    userProfileUpdate: updateUserProfileReducer,
    userList: getUserListReducer,
    deleteUserDetails: deleteUserReducer,
    updateUserAdmin: adminUserUpdateReducer,
    userById: getUserByIdReducer,
    orderCreate: orderSaveReducer,
    orderDetails: getOrderByIdReducer,
    myOrders: getMyOrderReducer,
    orderList:getAllOrdersReducer,
    reviews:createReviewReducer,
    topProducts:topProductsReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {};


const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage, paymentMethod: paymentMethodFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]



const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;