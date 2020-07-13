import { Editor, Transforms, Range, Text, Node } from 'slate'

export const getCurrentPath = editor => {
    const { selection } = editor;
    const [start] = Range.edges(selection);
    return start.path;
}

export const getParentPath = editor => {
    const currentPath = getCurrentPath(editor);
    return currentPath > 1 ? currentPath.slice(0, currentPath.length-1) : currentPath;
}

export const isNodeEmptyAsideFromSelection = (editor, path) => {
    const { selection } = editor
    if (!selection) {
        return false;
    }

    if (Range.isCollapsed(selection)) {
        return Editor.string(editor, path) === '';
    } 
    
    return Editor.string(editor, selection) === Editor.string(editor, path);
}
