import { Editor, Transforms, Node, Element } from 'slate'

const withLayout = editor => {
    const { normalizeNode } = editor
  
    editor.normalizeNode = ([node, path]) => {
        if (path.length === 0) {
            // If there are no children, then insert a title node
            if (editor.children.length < 1) {
                const title = { type: 'title', children: [{ text: 'Untitled Document' }] }
                Transforms.insertNodes(editor, title, { at: path.concat(0) })
            }
            
            // If there is only one child, then add an empty paragraph node below the title node
            if (editor.children.length < 2) {
                const paragraph = { type: 'paragraph', children: [{ text: '' }] }
                Transforms.insertNodes(editor, paragraph, { at: path.concat(1) })
            }

            // Make sure structural integrity is preserved. That is, only the first node is a title node.
            for (const [child, childPath] of Node.children(editor, path)) {
                const isFirstNode = childPath[0] === 0;

                // `child` is the first node in the document
                if (isFirstNode) {
                    // Ensure first node is always a title node
                    if (child.type !== 'title') {
                        Transforms.setNodes(editor, { type: 'title' }, { at: childPath });
                    }
                    // Ensure first node has no nesting
                    for (const [subChild, subChildPath] of Node.children(editor, childPath)) {
                        if (Element.isElement(subChild) && !editor.isInline(subChild)) {
                            Transforms.unwrapNodes(editor, { at: subChildPath })
                            return
                        }
                    }
                } 
                // `child` is NOT the first node in the document
                else {
                    // Ensure only the first node is a title node
                    if (child.type === 'title') {
                        Transforms.setNodes(editor, { type: 'paragraph' }, { at: childPath });
                    }
                }
            }
        }
        
        return normalizeNode([node, path])
    }
  
    return editor
}

export default withLayout;