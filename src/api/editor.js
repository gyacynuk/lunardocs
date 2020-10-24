import { fire } from '../api'
import { USER_COLLECTION } from './user'

export const USER_DOCUMENT_COLLECTION = 'documents'

/**
 * 
 * @param {string} title 
 */
export const createNewDocumentValue = title => {
    if (title === '') {
        title = "Untitled Document"
    }
    
    return [
        {
            type: "title",
            children: [{ text: title }]
        },
        {
            type: "paragraph",
            children: [{ text : "" }]
        },
    ]
}

/**
 * 
 * @param {firebase.firestore.Firestore} db 
 * @param {string} userId 
 * @param {string} documentId 
 * @param {any} documentData 
 */
export const saveDocument = async (db, documentData) => {
    // Add timestamp to document data
    documentData = { ...documentData, timestamp: + new Date() }

    try {
        const currentUserUuid = fire.auth().currentUser.uid
        await db
            .collection(USER_COLLECTION)
            .doc(currentUserUuid)
            .collection(USER_DOCUMENT_COLLECTION)
            .doc(documentData.id)
            .set(documentData, { merge: true })
        return true;
    } catch (error) {
        console.log('error saving document')
        console.log(error)
    }

    return false;
}