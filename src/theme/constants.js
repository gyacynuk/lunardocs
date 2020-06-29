const navBarHeight = 80;
const navBarPaddingX = 32;
const navBarPaddingY = 24;

export default {
    navBar: {
        totalHeight: `${navBarHeight + 2*navBarPaddingY}px`,
        height: `${navBarHeight}px`,
        padding: {
            x: `${navBarPaddingX}px`,
            y: `${navBarPaddingY}px`,
        },
    },
    icon: {
        baseStyle: `
            width: 24px;
            height: 24px;
            margin: 0 16px;

            cursor: pointer;

            transition: stroke 200ms ease;
            &:hover {
                stroke: #7C89FF;
            }
        `,
        strokeStyleWith: theme => `
            stroke: ${({ theme }) => theme.palette.text.heavy};
            stroke-width: 1.5;
        `,
        fillStyleWith: theme => `
            fill: ${({ theme }) => theme.palette.text.heavy};
        `
    }
}
