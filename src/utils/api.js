// @flow

import { db } from '../firebase';
import type { Character, Party, Save } from '../types';

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

export function resolveParty(character: Character): Promise<Party> {
	const partyRef = db.ref(`parties/${character._partyRef}`);

	return new Promise((resolve, reject) => {
		partyRef.once('value', (snapshot) => {
			if (snapshot.exists()) {
				resolve(snapshot.val());
			} else {
				reject();
			}
		});
	});
}

export function resolveSave(party: Party): Promise<Save> {
	const partyRef = db.ref(`saves/${party._saveRef}`);

	return new Promise((resolve, reject) => {
		partyRef.once('value', (snapshot) => {
			if (snapshot.exists()) {
				resolve(snapshot.val());
			} else {
				reject();
			}
		});
	});
}

export function takeAction(partyId: string, characterID: string, nodeID: string, actionID: string) {
	const saveRef = db.ref(`parties/${partyId}/save`);
	const newSaveStep = saveRef.push();
	newSaveStep.set({
		_nodeRef: nodeID,
		_characterRef: characterID,
		_actionID: actionID,
	});
}
