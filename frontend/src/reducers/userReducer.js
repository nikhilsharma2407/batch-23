import { addFriendUtil, loginUtil, loginWithCookieUtil, logoutUtil } from "../apiUtil";

const initialState = {
    message: "",
    success: false,
    name: "",
    username: "",
    friendList: []
}

const ACTIONS = {
    LOGIN: "LOGIN",
    ERROR: "ERROR",
    LOGOUT: "LOGOUT",
    ADD_FRIEND: "ADD_FRIEND",
    REMOVE_FRIEND: "REMOVE_FRIEND"
};

export const errorActionCreator = payload => ({ type: ACTIONS.ERROR, payload });

const asyncActionCreator = (apiUtil, type, apiPayload) => {
    return async (dispatch) => {
        try {
            const data = (await apiUtil(apiPayload))?.data;
            dispatch({ type, payload: data });
        } catch (error) {
            const payload = error.response.data;
            dispatch(errorActionCreator(payload));
        }
    }
}

export const loginWithCookieAction = () => {
    return asyncActionCreator(loginWithCookieUtil, ACTIONS.LOGIN);
};

export const loginActionCreator = (payload) => {
    return asyncActionCreator(loginUtil, ACTIONS.LOGIN, payload);
};

export const addFriendAction = (payload) => {
    return asyncActionCreator(addFriendUtil, ACTIONS.ADD_FRIEND, payload);
};

export const removeFriendAction = (payload) => {

}
export const logoutAction = (payload) => {
    return asyncActionCreator(logoutUtil, ACTIONS.LOGOUT)
}


export const userReducer = (state = initialState, action) => {
    const { success, data, message } = action?.payload || {};
    switch (action.type) {
        case ACTIONS.LOGIN:
            const { name, username, friendList } = data;
            return { ...state, message, success, name, username, friendList };
        case ACTIONS.ERROR:
            return { ...state, message, success };
        case ACTIONS.ADD_FRIEND:
            return { ...state, message, success, friendList: data };

        case ACTIONS.LOGOUT:
            return { ...initialState, message, success }
        default:
            return state;
    }
}