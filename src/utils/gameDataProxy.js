import { resolveCharacter, resolveParty } from './api';

import { auth, isAuthenticated } from '../firebase';

class GameData {
	constructor(user) {
		this.user = user;
	}

	set character(character) {
		this._character = character;
	}

	get character() {
		const { uid } = this.user;
		return !this._character
			? resolveCharacter(uid).then((character) => {
				this.character = character;
				return character;
			})
			: Promise.resolve(this._character);
	}

	set party(party) {
		this._party = party;
	}

	get party() {
		return !this._party
			? this.character
				.then(character => resolveParty(character._partyRef).then(party => ({ party, character })))
				.then(({ party, character }) => {
					return Promise.all(party.participants.map(resolveCharacter))
						.then((participants) => {
							return {
								party: {
									...party,
									participants,
								},
								character,
							};
						});
				})
				.then(({ party, character }) => {
					this.party = {
						...party,
						character,
					};
					return this.party;
				})
			: Promise.resolve(this._party);
	}
}

export default () =>
	new Promise((resolve, reject) => {
		if (isAuthenticated()) {
			auth.onAuthStateChanged((user) => {
				resolve(new GameData(user));
			});
		} else {
			reject(new Error('401 UNAUTHORIZED'));
		}
	});
