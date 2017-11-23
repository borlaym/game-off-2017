// @flow

import type { Party, Character, Adventure, GameState, Tag, SaveStep, Option, ResultingAction } from './types';
import findLast from 'lodash/findLast';

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
	const resolvedCharacters: Array<Character> = JSON.parse(JSON.stringify(party.participants));
	let currentNode: Node = adventure.starter;
	const log = [];
	const player: ?Character = resolvedCharacters.find(_ => _._uid === playerId);
	if (!player) {
		throw new Error('Player not found');
	}
	Object.keys(party.save).forEach((saveKey: string) => {
		// Iterate through all save steps
		const saveStep: SaveStep = party.save[saveKey];
		const node = adventure[saveStep._nodeRef];
		const actingPlayer: ?Character =
			resolvedCharacters.find(_ => _._uid === saveStep._characterRef);
		if (!actingPlayer) {
			throw new Error('Player not found');
		}
		const allActions = node.options.reduce((acc, option) => [
			...acc,
			option.resultingAction,
		], []);
		const takenAction: ?ResultingAction = allActions.find(_ => _.id === saveStep._actionID);
		if (!takenAction) {
			return;
		}
		const takenOption: ?Option = node.options.find(_ => _.resultingAction.id === takenAction.id);
		if (!takenOption) {
			return;
		}
		// Apply effects
		if (takenAction.effects) {
			(takenAction.effects.gainTags || []).forEach((effect) => {
				if (effect.target.toLowerCase() === 'self') {
					actingPlayer.tags.push(effect.tag);
				} else {
					globalTags.push(effect.tag);
				}
			});
		}
		if (takenAction.effects) {
			(takenAction.effects.loseTags || []).forEach((effect) => {
				if (effect.target.toLowerCase() === 'self') {
					actingPlayer.tags = actingPlayer.tags.filter(_ => _ !== effect.tag);
				} else {
					globalTags = globalTags.filter(_ => _ !== effect.tag);
				}
			});
		}
		// Set next node if the action was taken by the current player
		if (actingPlayer === player) {
			currentNode = adventure[takenAction.targetNode];
			const timestamp = (new Date(currentNode.inGameTimestamp)).getTime();
			// Add message to log
			log.push({
				text: node.text,
				timestamp,
			});
			log.push({
				text: takenOption.logText || takenOption.text,
				timestamp: timestamp + 1,
			});
		}
	});
	return {
		globalTags,
		characters: resolvedCharacters,
		player,
		currentNode,
		log,
	};
};

export default resolveGameState;
