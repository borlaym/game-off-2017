// @flow

import resolveGameState from './resolveGameState';
import adventure from './adventure.json';

const defaultValue = {
	adventure,
	party: {
		save: {},
		participants: [{
			_uid: 'player1',
			name: 'Player One',
			tags: [],
			_partyRef: 'party1',
		}, {
			_uid: 'player2',
			name: 'Player Two',
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
				_actionID: '2',
			},
		}));
		expect(gameState.characters).toMatchSnapshot();
		expect(gameState.currentNode.id).toMatchSnapshot();
	});

	it('resolves an action that gives a global tag as well', () => {
		const gameState = resolveGameState(valueWithSave({
			save1: {
				_nodeRef: 'starter',
				_characterRef: 'player1',
				_actionID: '1',
			},
		}));
		expect(gameState.characters).toMatchSnapshot();
		expect(gameState.globalTags).toMatchSnapshot();
	});

	it('current node is calculated for the current player, not for all players', () => {
		const gameState = resolveGameState(valueWithSave({
			save1: {
				_nodeRef: 'starter',
				_characterRef: 'player2',
				_actionID: '1',
			},
		}));
		expect(gameState.currentNode.id).toMatchSnapshot();
	});
});
