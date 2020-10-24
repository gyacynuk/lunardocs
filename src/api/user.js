import { fire } from '../api'
import { saveDocument } from './editor';
import { generateInitialDocument, generateInitialDocumentMetaData } from './initialDocument';

export const USER_COLLECTION = 'users'

const generateInitialUser = db => {
    const newUser = {
        preferredTheme: 'dark',
        documents: [ generateInitialDocumentMetaData() ],
    }

    upsertUser(db, newUser);
    saveDocument(db, generateInitialDocument());

    return newUser;
}

/**
 * 
 * @param {firebase.firestore.Firestore} db 
 * @param {string} userId 
 */
export const fetchUser = async (db, userId) => {
    try {
        const user = await db.collection(USER_COLLECTION).doc(userId).get();

        // If the user does not exist, then create them a profile and return the initial user object
        if (!user.exists) {
            return generateInitialUser(db)
        }
        return user.data()
    } catch (error) {
        console.log('error fetching user')
        console.log(error)
    }

    return undefined
}

/**
 * 
 * @param {firebase.firestore.Firestore} db 
 * @param {*} userData
 */
export const upsertUser = async (db, userData) => {
    const currentUserUuid = fire.auth().currentUser.uid
    await db.collection(USER_COLLECTION).doc(currentUserUuid).set(
        userData,
        { merge: true})
    return true
}

export const signOutUser = async (history) => {
    await fire.auth().signOut();
    history.push('/')
}