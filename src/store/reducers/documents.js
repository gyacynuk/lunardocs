import { SET_DOCUMENTS } from "../actionTypes";

const initialState = {
    documents: [],
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_DOCUMENTS: {
            return {
                ...state,
                documents: action.payload,
            }
        }
        default:
            return state;
    }
}
