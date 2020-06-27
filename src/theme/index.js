import typography from './typography'
import { darkPalette, lightPalette } from './palette'
import { breakpoints, isMobile, isTablet, isDesktop } from './breakpoint'

const baseTheme = {
    isMobile,
    isTablet,
    isDesktop,
    breakpoints,
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
