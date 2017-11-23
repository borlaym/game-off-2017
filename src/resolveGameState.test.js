// @flow

import resolveGameState from './resolveGameState';
import adventure from './adventure.json';

describe('resolveGameState', () => {
	it('returns the base game state', () => {
		const gameState = resolveGameState({
			adventure,
			party: {
				save: {},
				participants: [{
					_uid: 'player1',
					name: 'Player',
					tags: [],
					_partyRef: 'party1',
				}],
			},
			playerId: 'player1',
		});
		expect(gameState).toMatchSnapshot();
	});
});
