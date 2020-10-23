import firebase from 'firebase'
import { fetchUser, signOutUser, upsertUser } from './user'
import { saveDocument, createNewDocumentValue } from './editor'
import { fetchAllDocuments, fetchDocumentById } from './documents'

export const fire = firebase.initializeApp({
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})
export const db = fire.firestore();

export default {
    fetchUser,
    signOutUser,
    upsertUser,
    createNewDocumentValue,
    saveDocument,
    fetchAllDocuments,
    fetchDocumentById,
}