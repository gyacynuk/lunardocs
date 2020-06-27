import { css } from 'styled-components';

export const breakpoints = {
  mobileMax: '767px',
  tabletMax: '1024px',
};

export const isMobile = (...args) => css`
  @supports (display: grid) {
    @media (max-width: ${breakpoints.mobileMax}) {
      ${css(...args)}
    }
  }
`;

export const isTablet = (...args) => css`
  @supports (display: grid) {
    @media (min-width: ${breakpoints.mobileMax}) {
      ${css(...args)}
    }
  }
`;

export const isDesktop = (...args) => css`
  @supports (display: grid) {
    @media (min-width: ${breakpoints.tabletMax}) {
      ${css(...args)}
    }
  }
`;
