// @flow

import type { Party, Character, Adventure, GameState } from './types';

export default function({
	adventure,
	party,
	player
}: {
	adventure: Adventure,
	party: Party,
	player: Character
}): GameState {
	let globalTags: Array<Tag> = [];
	const resolvedPlayer = {
		...player,
		tags: []
	};
	let currentNode: Node = adventure.starter;
	Object.keys(party.save).forEach((saveKey: string) => {
		const saveStep = party.save[saveKey];
		const node = adventure[saveStep._nodeRef];
		const allActions = node.options.reduce((acc, option) => {
			return [
				...acc,
				option.resultingAction
			];
		}, []);
		const takenAction = allActions.find(_ => _.id === saveStep._actionID);
		// Apply effects
		if (takenAction.effects) {
			(takenAction.effects.gainTags || []).forEach((effect) => {
				if (effect.target === 'SELF') {
					resolvedPlayer.tags.push(effect.tag);
				} else {
					globalTags.push(effect.tag);
				}
			});
			(takenAction.effects.loseTags || []).forEach((effect) => {
				if (effect.target === 'SELF') {
					resolvedPlayer.tags = resolvedPlayer.tags.filter(_ => _ !== effect.tag);
				} else {
					globalTags = globalTags.filter(_ => _ !== effect.tag);
				}
			});
		}
		currentNode = adventure[takenAction.targetNode];
	});
	return {
		globalTags,
		characters: [],
		player: resolvedPlayer,
		currentNode
	};
}