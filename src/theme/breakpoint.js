import { css } from 'styled-components';

export const breakpoints = {
  mobileMax: '767px',
  tabletMax: '1024px',
};

export const isMobileJs = window.matchMedia(`(max-width: ${breakpoints.mobileMax})`)
export const isMobile = (...args) => css`
  @supports (display: grid) {
    @media (max-width: ${breakpoints.mobileMax}) {
      ${css(...args)}
    }
  }
`;

export const isTabletJs = window.matchMedia(`(min-width: ${breakpoints.mobileMax})`)
export const isTablet = (...args) => css`
  @supports (display: grid) {
    @media (min-width: ${breakpoints.mobileMax}) {
      ${css(...args)}
    }
  }
`;

export const isDesktopJs = window.matchMedia(`(min-width: ${breakpoints.tabletMax})`)
export const isDesktop = (...args) => css`
  @supports (display: grid) {
    @media (min-width: ${breakpoints.tabletMax}) {
      ${css(...args)}
    }
  }
`;
