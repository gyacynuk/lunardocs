import { fire } from '../api'

export const USER_COLLECTION = 'users'

/**
 * 
 * @param {firebase.firestore.Firestore} db 
 * @param {string} userId 
 */
export const fetchUser = async (db, userId) => {
    try {
        const user = await db.collection(USER_COLLECTION).doc(userId).get();
        if (!user.exists) {
            console.log('No such document!');
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