// @flow

import type { Party, Character, Adventure, GameState, Tag, SaveStep } from './types';

const resolveGameState = ({
	adventure,
	party,
	playerId,
}: {
	adventure: Adventure,
	party: Party,
	playerId: string
}): GameState => {
	let globalTags: Array<Tag> = [];
	const resolvedCharacters: Array<Character> = party.participants.map(c => ({
		...c,
	}));
	let currentNode: Node = adventure.starter;
	const player: ?Character = resolvedCharacters.find(_ => _._uid === playerId);
	if (!player) {
		throw new Error('Player not found');
	}
	Object.keys(party.save).forEach((saveKey: string) => {
		// Iterate through all save steps
		const saveStep: SaveStep = party.save[saveKey];
		const node = adventure[saveStep._nodeRef];
		const allActions = node.options.reduce((acc, option) => [
			...acc,
			option.resultingAction,
		], []);
		const takenAction = allActions.find(_ => _.id === saveStep._actionID);
		if (!takenAction) {
			return;
		}
		// Apply effects
		if (takenAction.effects) {
			(takenAction.effects.gainTags || []).forEach((effect) => {
				if (effect.target.toLowerCase() === 'self') {
					player.tags.push(effect.tag);
				} else {
					globalTags.push(effect.tag);
				}
			});
		}
		if (takenAction.effects) {
			(takenAction.effects.loseTags || []).forEach((effect) => {
				if (effect.target.toLowerCase() === 'self') {
					player.tags = player.tags.filter(_ => _ !== effect.tag);
				} else {
					globalTags = globalTags.filter(_ => _ !== effect.tag);
				}
			});
		}
		// Set next node
		currentNode = adventure[takenAction.targetNode];
	});
	return {
		globalTags,
		characters: resolvedCharacters,
		player,
		currentNode,
	};
};

export default resolveGameState;