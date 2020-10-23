const navBarHeight = 80;
const navBarPaddingX = 32;
const navBarPaddingY = 24;

const dotSize = 14;

const editorToolBarHeight = 32;
const editorToolBarIconMargins = 16;
const editorToolBarSpacerMargins = 32;

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

            transition: stroke 200ms ease;
            transition: fill 200ms ease;

            cursor: pointer;
        `,
        strokeStyleWith: theme => `
            stroke: ${theme.palette.text.heavy};
            stroke-width: 1.5;

            &:hover {
                stroke: #7C89FF;
            }
        `,
        fillStyleWith: theme => `
            fill: ${theme.palette.text.heavy};

            &:hover {
                fill: #7C89FF;
            }
        `,
    },
    browser: {
        dotSize: `${dotSize}px`,
    },
    editor: {
        toolBarHeight: `${editorToolBarHeight}px`,
        icons: {
            margins: `${editorToolBarIconMargins}px`,
            textButtonWidth: `20px`,
        },
        spacers: {
            height: `20px`,
            marginLeft: `${editorToolBarSpacerMargins - editorToolBarIconMargins}px`,
            marginRight: `${editorToolBarSpacerMargins}px`,
        }
    }
}
