import constants from './constants'
import typography from './typography'
import { darkPalette, lightPalette, landingPalette } from './palette'
import { breakpoints, isMobile, isTablet, isDesktop } from './breakpoint'

const baseTheme = {
    isMobile,
    isTablet,
    isDesktop,
    breakpoints,
    constants,
    typography
}

export const lightTheme = {
    palette: lightPalette,
    ...baseTheme
}

export const darkTheme = {
    palette: darkPalette,
    ...baseTheme
}

export const landingTheme = {
    palette: landingPalette,
    ...baseTheme
}
