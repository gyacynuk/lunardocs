import { TOGGLE_DISPLAY_MODE, SET_THEME } from "../actionTypes";

const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';
const LANDING_THEME = 'landing';

const initialState = {
    theme: LANDING_THEME
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_THEME: {
            return {
                ...state,
                theme: action.payload.theme,
            }
        }
        default:
            return state;
    }
}
