// @flow

import resolveGameState from './resolveGameState';
import adventure from './adventure.json';

const defaultValue = {
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
};

/**
 * Helper for quickly creating default inputs for resolveGameState
 * with provided save steps
 */
const valueWithSave = save => ({
	...defaultValue,
	party: {
		...defaultValue.party,
		save,
	},
});

describe('resolveGameState', () => {
	it('returns the base game state', () => {
		const gameState = resolveGameState(defaultValue);
		expect(gameState).toMatchSnapshot();
	});

	it('resolves an action that gives a tag', () => {
		const gameState = resolveGameState(valueWithSave({
			save1: {
				_nodeRef: 'starter',
				_characterRef: 'player1',
				_actionID: '1',
			},
		}));
		expect(gameState.player).toMatchSnapshot();
		expect(gameState.currentNode.id).toMatchSnapshot();
	});
});
