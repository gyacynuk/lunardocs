import { fire } from '../api'
import { USER_COLLECTION } from './user'
import { USER_DOCUMENT_COLLECTION } from './editor'

export const fetchDocumentById = async (db, documentId) => {
    console.log('fetchDocumentById')
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
                    // TODO handle error when doc id does not exist
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
    try {
        const currentUserUuid = fire.auth().currentUser.uid
        return await db
            .collection(USER_COLLECTION)
            .doc(currentUserUuid)
            .collection(USER_DOCUMENT_COLLECTION)
            .orderBy("timestamp", "desc")
            .get()
            .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
    } catch (error) {
        console.error('error fetching documents')
        console.log(error)
    }

    return [];
}