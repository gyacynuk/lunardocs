import {v4 as uuid} from 'uuid'

var initialDocumentID = uuid()
const initialDocumentTitle = "Welcome to LunarDocs! 🚀 "
const initialDocumentValue = [
    {
        type: "title",
        children: [{text: initialDocumentTitle}]
    },
    {
        children: [{text: "LunarDocs is a lightweight and easy-to-use web-based text editor.  Let's get started! "}],
        type: "paragraph"
    },
    {
        children: [{text: "In the toolbar at the top of the page, on the right hand side, you will find a save icon 🔄. Whenever this is spinning it indicates that your changes are being automatically saved for you! Next to this icon you'll see a crescent moon 🌙, and clicking this will toggle your theme between ligth and dark. "}],
        type: "paragraph"
    },
    {
        type: "paragraph",
        children: [{text: "On the left hand side you will see a bunch of options to customize the text of your document. The first dropdown menu on the left hand side provides you with many text styles, such as:"}]
    },
    {
        children: [{text: "Headers,"}],
        type: "header1"
    },
    {
        type: "header2",
        children: [{text: "Headers,"}]
    },
    {
        children: [{text: "And Even More Headers!"}],
        type: "header3"
    },
    {
        children: [{text: ""}],
        type: "paragraph"
    },
    {
        type: "paragraph",
        children: [{text: "If you're interested in computer programming 💻, you'll enjoy the ability to insert code blocks from this menu as well:"}]
    },
    {
        children: [{text: "def how_to_use():\r\n    print \"Hold Shift and press Enter to add a new line to a code\r\n           block, as seen in this example!\""}],
        type: "codeblock"
    },
    {
        children: [{text: ""}],
        type: "paragraph"
    },
    {
        children: [{text: "You'll also find buttons to create "},{text: "bold",bold: true},{text: ", "},{italic: true,text: "italic"},{text: ", and "},{underline: true,text: "underlined"},{text: " text in the toolbar. These can be activated by pressing ⌘+B, ⌘+I, and ⌘+U respectively. (For Windows or Linux users, press ctrl instead of cmd). Furthermore you have the ability to define "},{text: "inline code segments",code: true},{text: " with the "},{text: "<>",code: true},{text: " button!"}],
        type: "paragraph"
    },
    {
        children: [{type: "list-item",children: [{text: "Lists can be created with the last two buttons in the toolbar."}]},{children: [{text: "Just like with code blocks, holding Shift + Enter will add a new line to your list!"}],type: "list-item"}],
        type: "bulleted-list"
    },
    {
        type: "paragraph",
        children: [{text: "Finally, LunarDocs provides keyboard shortcuts for our power users ⚡️. To use a shortcut, type slash (/) and a dropdown menu will appear. Continue typing to refine your search, or use the arrow keys to select an option, and press Enter to apply it!"}]
    }
]

export function isInitialDocument(id) {
    return id === initialDocumentID
}

export function generateInitialDocumentNoValue() {
    return {
        id: initialDocumentID,
        title: initialDocumentTitle,
        timestamp: + new Date(),
    }
}

export function generateInitialDocumentAndDestroyPreset() {
    // Create inital doc with existing data
    const initalDoc =  {
        id: initialDocumentID,
        title: initialDocumentTitle,
        value: initialDocumentValue,
        timestamp: + new Date(),
    }

    // Scramble the initial UUID, effectively destroying access to the pregenerated doc
    initialDocumentID = uuid();

    // return the doc
    return initalDoc
}

