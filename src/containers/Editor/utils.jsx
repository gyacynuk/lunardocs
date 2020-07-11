import { Editor, Transforms, Range, Text, Node } from 'slate'

export const getParentPath = editor => {
    const { selection } = editor;
    const [start] = Range.edges(selection);
    return start.path.length > 1 ? start.path.slice(0, start.path.length-1) : start.path;
}

export const isNodeEmptyAsideFromSelection = editor => {
    const { selection } = editor
    if (!selection) {
        return false;
    }

    let parentPath = getParentPath(editor)
    if (Range.isCollapsed(selection)) {
        return Editor.string(editor, parentPath) === '';
    } 
    else {
        return Editor.string(editor, selection) === Editor.string(editor, parentPath);
    }
}
