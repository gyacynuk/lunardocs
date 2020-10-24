import { fire } from '../api'
import { fetchUser, upsertUser, USER_COLLECTION } from './user'
import { USER_DOCUMENT_COLLECTION } from './editor'
import { generateInitialDocumentNoValue } from './initialDocument'

export const fetchDocumentById = async (db, documentId) => {
    try {
        const currentUserUuid = fire.auth().currentUser.uid
        return await db
            .collection(USER_COLLECTION)
            .doc(currentUserUuid)
            .collection(USER_DOCUMENT_COLLECTION)
            .doc(documentId)
            .get()
            .then(doc => {
                if (doc.exists) {
                    return doc.data();
                } else {
                    return {}
                }
            });
    } catch (error) {
        console.error('error fetching document by id')
        console.log(error)
    }

    // TODO handle error when exception occurs
    return {}
}

export const fetchAllDocuments = async (db) => {
    const currentUserUuid = fire.auth().currentUser.uid;
    const user = await fetchUser(db, currentUserUuid)
    if (user && user.documents) {
        return user.documents
    }

    return [ generateInitialDocumentNoValue() ];
}

export const saveDocuments = async (db, documents) => {
    upsertUser(db, { documents });
}