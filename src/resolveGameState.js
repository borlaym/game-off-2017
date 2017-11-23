// @flow

import type { Party, Character, Adventure, GameState, Tag, SaveStep, Option, ResultingAction, LogEntry } from './types';

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
	resolvedCharacters.forEach((_) => {
		if (!_.tags) {
			_.tags = [];
		}
	});
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
		const allActions: Array<ResultingAction> = node.options.reduce((acc, option) => [
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
			// Add all player interactions on this node to the log
			const saveSteps: Array<SaveStep> = Object.keys(party.save).map(_ => party.save[_]);
			const allPlayerSavesOnThisNode = saveSteps.filter(_ => _._nodeRef === node.id);
			const logEntries: Array<LogEntry> =
				allPlayerSavesOnThisNode.map((save: SaveStep, index: number) => {
					const action: ResultingAction = allActions.find(_ => _.id === save._actionID);
					const option: Option = node.options.find(_ => _.resultingAction.id === action.id);
					return {
						text: option.logText || option.text,
						timestamp: timestamp + (index + 1),
					};
				});
			logEntries.forEach(_ => log.push(_));
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
