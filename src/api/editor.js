import { fire } from '../api'
import { USER_COLLECTION } from './user'

export const USER_DOCUMENT_COLLECTION = 'documents'

/**
 * 
 * @param {firebase.firestore.Firestore} db 
 * @param {string} userId 
 * @param {string} documentId 
 * @param {any} documentData 
 */
export const saveDocument = async (db, documentData) => {
    console.log('saveDocument')
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