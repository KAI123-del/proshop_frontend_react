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
    USER_PROFILE_RESET,
    USERLIST_REQUEST,
    USERLIST_SUCCESS,
    USERLIST_FAILED,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILED,
    USER_DELETE_REQUEST,
    ADMIN_UPDATE_USER_REQUEST,
    ADMIN_UPDATE_USER_SUCCESS,
    ADMIN_UPDATE_USER_FAILED,
    USER_BY_ID_REQUEST,
    USER_BY_ID_SUCCESS,
    USER_BY_ID_FAILED,
    USER_BY_ID_RESET,
    ADMIN_UPDATE_USER_RESET

} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAILED:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const getUserReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return { ...state, loading: false }
        case USER_DETAIL_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAIL_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateUserProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, userInfo: action.payload }
        case USER_UPDATE_PROFILE_FAILED:
            return { loading: false, error: action.payload }
        case USER_PROFILE_RESET:
            return {}
        default:
            return state;
    }
}

export const getUserListReducer = (state = { userList: [] }, action) => {
    switch (action.type) {
        case USERLIST_REQUEST:
            return { loading: true }
        case USERLIST_SUCCESS:
            return { loading: false, users: action.payload.users, page: action.payload.page, pages: action.payload.pages }
        case USERLIST_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false, success: action.payload }
        case USER_DELETE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const adminUserUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_UPDATE_USER_REQUEST:
            return { loading: true }
        case ADMIN_UPDATE_USER_SUCCESS:
            return { loading: false, success: 'user successfully updated', updatedUser: action.payload }
        case ADMIN_UPDATE_USER_FAILED:
            return { loading: false, error: action.payload }
        case ADMIN_UPDATE_USER_RESET:
            return {}
        default:
            return state;
    }
}

export const getUserByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_BY_ID_REQUEST:
            return { loading: true }
        case USER_BY_ID_SUCCESS:
            return { loading: false, allUsers: action.payload }
        case USER_BY_ID_FAILED:
            return { loading: false, error: action.payload }
        case USER_BY_ID_RESET:
            return {}
        default:
            return state;
    }
}