import { loginUtil } from "../apiUtil";
const initialState = {
    message: "",
    success: false,
    name: "",
    username: "",
    friendList: []
}

const ACTIONS = {
    LOGIN: "LOGIN"
};

export const loginActionCreator = (payload) => {

    return async (dispatch) => {
        try {
            const data = (await loginUtil(payload))?.data;
            dispatch({ type: ACTIONS.LOGIN, payload: data });
        } catch (error) {
            console.log(error);
        }

    }
};


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGIN:
            const { success, data, message } = action?.payload;
            const { name, username, friendList } = data;
            return { ...state, message, success, name, username, friendList };
        default:
            return state;
    }
}