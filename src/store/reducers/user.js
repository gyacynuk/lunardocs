import { SET_USER } from "../actionTypes";

const initialState = {
    user: null,
    pending: true
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.payload.user,
                pending: false
            }
        }
        default:
            return state;
    }
}
