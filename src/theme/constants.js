const navBarHeight = 80;
const navBarPaddingX = 32;
const navBarPaddingY = 24;

const dotSize = 14;

export default {
    navBar: {
        height: `${navBarHeight}px`,
        padding: {
            x: `${navBarPaddingX}px`,
            y: `${navBarPaddingY}px`,
        },
    },
    icons: {
        baseStyle: `
            width: 24px;
            height: 24px;
            margin: 0 16px;

            cursor: pointer;
        `,
        strokeStyleWith: theme => `
            stroke: ${theme.palette.text.heavy};
            stroke-width: 1.5;

            transition: stroke 200ms ease;
            &:hover {
                stroke: #7C89FF;
            }
        `,
        fillStyleWith: theme => `
            fill: ${theme.palette.text.heavy};

            transition: fill 200ms ease;
            &:hover {
                fill: #7C89FF;
            }
        `,
    },
    browser: {
        dotSize: `${dotSize}px`,
    }
}
