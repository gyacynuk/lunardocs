import { fire } from '../api'
import { fetchUser, upsertUser, USER_COLLECTION } from './user'
import { USER_DOCUMENT_COLLECTION } from './editor'
import { isInitialDocument, generateInitialDocument, blockAccessToInitialDocument } from './initialDocument'

export const fetchDocumentById = async (db, documentId) => {
    // If the user is opening the initial document for the first time
    if (isInitialDocument(documentId)) {
        // If the user is opening the initial document for the first time, we can avoid reading from the DB and just
        // return the local copy. However we need to block access to the local copy of the doc here on after, to
        // ensure that any changes made are loaded in the future.
        const welcomeDocument = generateInitialDocument();
        blockAccessToInitialDocument();

        return welcomeDocument
    }

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

    // If the user has logged in before, then just return their documents
    if (user && user.documents !== undefined) {
        return user.documents
    }

    return []
}

export const saveDocuments = async (db, documents) => {
    upsertUser(db, { documents });
}