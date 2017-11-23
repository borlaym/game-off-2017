// @flow

import { db } from '../firebase';
import type { Character } from '../types';

export function createCharacter(userID: string, characterDetails: Character): Promise<Character> {
	const dummyCharacter = {
		_uid: userID,
		_partyRef: 'no martini, no party',
		...characterDetails,
	};

	return new Promise((resolve, reject) => {
		db
			.ref(`characters/${userID}`)
			.set(dummyCharacter)
			.then(() => resolve(dummyCharacter))
			.catch(reject);
	});
}

export function resolveCharacter(userID: string): Promise<Character> {
	const characterRef = db.ref(`characters/${userID}`);

	return new Promise((resolve, reject) => {
		characterRef.once('value', (snapshot) => {
			if (snapshot.exists()) {
				resolve(snapshot.val());
			} else {
				reject();
			}
		});
	});
}
