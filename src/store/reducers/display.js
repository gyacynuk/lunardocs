import { TOGGLE_DISPLAY_MODE } from "../actionTypes";

const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

const oppositeTheme = (theme) => {
    if (theme === LIGHT_THEME) {
        return DARK_THEME;
    }
    return LIGHT_THEME;
}

const initialState = {
    theme: LIGHT_THEME
};

export default (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_DISPLAY_MODE: {
            const { theme } = state
            return {
                ...state,
                theme: oppositeTheme(theme),
            }
        }
        default:
            return state;
    }
}
