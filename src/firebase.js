// @flow

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { firebaseConfig } from './config';

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.database();
export const auth = firebaseApp.auth();
export const authProvider = firebase.auth;

const storageKey = 'uid';
auth.onAuthStateChanged((user) => {
	if (user) {
		localStorage.setItem(storageKey, user.uid);
	} else {
		localStorage.removeItem(storageKey);
	}
});

export const isAuthenticated = () =>
	Boolean(auth.currentUser) || Boolean(localStorage.getItem(storageKey));
