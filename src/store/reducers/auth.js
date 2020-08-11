import { SET_AUTH_USER } from "../actionTypes";

const initialState = {
    user: null,
    pending: true
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH_USER: {
            return {
                ...state,
                user: action.payload,
                pending: false,
            }
        }
        default:
            return state;
    }
}
