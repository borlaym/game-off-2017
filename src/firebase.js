import { firebaseConfig } from './config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.database();
export const auth = firebaseApp.auth();

const storageKey = 'uid';
auth.onAuthStateChanged(user => {
	if (user) {
		window.localStorage.setItem(storageKey, user.uid);
	} else {
		window.localStorage.removeItem(storageKey);
	}
});

export const isAuthenticated = () => 
	Boolean(auth.currentUser) || Boolean(localStorage.getItem(storageKey));

export default firebase;
