import { Transforms } from 'slate'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'

export const SHORTCUTS = [
    { name: 'bulleted-list', type: 'block', nodeProperties: { isInline: false, isVoid: false } },
    { name: 'code', type: 'mark' },
    { name: 'codeblock', type: 'block', nodeProperties: { isInline: false, isVoid: false } },
    { name: 'header1', type: 'block', nodeProperties: { isInline: false, isVoid: false } },
    { name: 'header2', type: 'block', nodeProperties: { isInline: false, isVoid: false } },
    { name: 'header3', type: 'block', nodeProperties: { isInline: false, isVoid: false } },
    { name: 'paragraph', type: 'block', nodeProperties: { isInline: false, isVoid: false } },
    // { name: 'image', nodeProperties: { isInline: false, isVoid: true } },
    // { name: 'link', nodeProperties: { isInline: false, isVoid: false } },
    { name: 'numbered-list', type: 'block', nodeProperties: { isInline: false, isVoid: false } },
];
export const SHORTCUTS_MAP = SHORTCUTS.reduce((map, shortcut) => (map[shortcut.name] = shortcut, map), {});
export const MARKS = ['bold', 'italic', 'underline', 'code']

export const isElementBlock = name => {
    return !!SHORTCUTS.find(shortcut => shortcut.name === name && shortcut.type === 'block');
}

export const isElementInline = name => {
    const element = SHORTCUTS_MAP[name];
    if (!element) return false;

    return element.nodeProperties && element.nodeProperties.isInline;
}

export const isElementVoid = name => {
    const element = SHORTCUTS_MAP[name];
    if (!element) return false;

    return element.nodeProperties && element.nodeProperties.isVoid;
}

export const isImageUrl = url => {
    if (!url) return false
    if (!isUrl(url)) return false
    const ext = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext)
}

export const insertImage = (editor, url) => {
    const text = { text: '' }
    const image = { type: 'image', url, children: [text] }
    Transforms.insertNodes(editor, image)
}

const withCustomElements = editor => {
    const { isInline, isVoid, insertData } = editor;
  
    editor.isInline = element => isElementInline(element.type) ? true : isInline(element);
    editor.isVoid = element => isElementVoid(element.type) ? true : isVoid(element);

    editor.insertData = data => {
        const text = data.getData('text/plain')
        const { files } = data

        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader()
                const [mime] = file.type.split('/')

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result
                        insertImage(editor, url)
                    })

                    reader.readAsDataURL(file)
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text)
        } else {
            insertData(data)
        }
    }

    return editor;
}

export default withCustomElements;