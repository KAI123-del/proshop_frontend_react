import {
    PRODUCT_CREATE_FAILED,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_REVIEW_FAILED,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAILED,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_UPDATE_FAILED,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    TOP_PRODUCT_FAILED,
    TOP_PRODUCT_REQUEST,
    TOP_PRODUCT_SUCCESS
} from '../constants/ProductConstants'



// reducer for the products page
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products,page:action.payload.page,pages:action.payload.pages }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}



// reducer for the product detail page
export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case 'PRODUCT_DETAIL_REQUEST':
            return { loading: true, ...state }
        case 'PRODUCT_DETAIL_SUCCESS':
            return { loading: false, product: action.payload }
        case 'PRODUCT_DETAIL_FAILED':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}



// reducer for creating a product
export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, createProductData: action.payload }
        case PRODUCT_CREATE_FAILED:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

// reducer for deleting a product (admin only)
export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success:true,delMessage:action.payload }
        case PRODUCT_DELETE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const createReviewReducer=(state={},action)=>{
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading:true}
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading:false,reviewMessage:action.payload}
        case PRODUCT_CREATE_REVIEW_FAILED:
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}

// reducer for updating a product (admin only)
export const updateProductReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, updatedProduct: action.payload }
        case PRODUCT_UPDATE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

//  reducer for top products
export const topProductsReducer=(state={topProducts:[]},action)=>{
    switch(action.type){
        case TOP_PRODUCT_REQUEST:
            return {loading:true,topProducts:[]}
        case TOP_PRODUCT_SUCCESS:
            return {loading:false,topProducts:action.payload}
        case TOP_PRODUCT_FAILED:
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}