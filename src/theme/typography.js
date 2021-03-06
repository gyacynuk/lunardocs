const fontWeightLight = 300;
const fontWeightRegular = 400;
const fontWeightMedium = 500;
const fontWeightBold = 700;

const fontFamily = '"Barlow", "Helvetica", "Arial", sans-serif';
const editorFontFamily = '"Barlow", "Helvetica", "Arial", sans-serif';
const codeFontFamily = '"Source Code Pro", monospace';

export default {
  htmlFontSize: 16,
  fontFamily,
  codeFontFamily,
  fontWeightLight,
  fontWeightRegular,
  fontWeightMedium,
  fontWeightBold,
  h1: {
    fontFamily: fontFamily,
    fontWeight: fontWeightRegular,
    fontSize: '2.125rem',
    lineHeight: 1.1,
  },
  h2: {
    fontFamily: fontFamily,
    fontWeight: fontWeightRegular,
    fontSize: '2rem',
    lineHeight: 1.2,
  },
  h3: {
    fontFamily: fontFamily,
    fontWeight: fontWeightRegular,
    fontSize: '1.75rem',
    lineHeight: 1.2,
  },
  h4: {
    fontFamily: fontFamily,
    fontWeight: fontWeightRegular,
    fontSize: '1.5rem',
    lineHeight: 1.28,
  },
  h5: {
    fontFamily: fontFamily,
    fontWeight: fontWeightRegular,
    fontSize: '1.25rem',
    lineHeight: 1.41,
  },
  h6: {
    fontFamily: fontFamily,
    fontWeight: fontWeightRegular,
    fontSize: '1rem',
    lineHeight: 1.4,
  },
  bodyLarge: {
    fontFamily: fontFamily,
    fontWeight: fontWeightRegular,
    fontSize: '1.25rem',
    lineHeight: 1.4,
  },
  body: {
    fontFamily: fontFamily,
    fontWeight: fontWeightRegular,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  bodySmall: {
    fontFamily: fontFamily,
    fontWeight: fontWeightRegular,
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  searchBar:{
    fontFamily: fontFamily,
    fontWeight: fontWeightRegular,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  button: {
    fontFamily: editorFontFamily,
    fontWeight: fontWeightRegular,
    fontSize: '1rem',
    lineHeight: 1.4,
  },
  editor: {
    fontFamily: editorFontFamily,
    fontWeight: fontWeightRegular,
    fontSize: '1rem',
    lineHeight: 1.5,
    marginBottom: '.5rem',

    navBar: {
      fontFamily: fontFamily,
      fontWeight: fontWeightBold,
      fontSize: '1.1rem',
      lineHeight: 1.2,
    },

    title: {
      fontFamily: fontFamily,
      fontWeight: fontWeightMedium,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h1: {
      fontFamily: fontFamily,
      fontWeight: fontWeightMedium,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: fontFamily,
      fontWeight: fontWeightMedium,
      fontSize: '1.5rem',
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: fontFamily,
      fontWeight: fontWeightMedium,
      fontSize: '1.3rem',
      lineHeight: 1.2,
    },
  }
};