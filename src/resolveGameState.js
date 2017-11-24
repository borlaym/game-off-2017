// @flow

import type { Save, Character, Adventure, GameState, Tag, SaveStep, Option, ResultingAction, LogEntry } from './types';
import resolveText from './utils/textResolver';

const resolveGameState = ({
	adventure,
	participants,
	save,
	playerId,
}: {
	adventure: Adventure,
	participants: Array<Character>,
	save: Save,
	playerId: string
}): GameState => {
	let globalTags: Array<Tag> = [];
	const resolvedParticipants: Array<Character> = JSON.parse(JSON.stringify(participants));
	resolvedParticipants.forEach((_) => {
		if (!_.tags) {
			_.tags = []; // eslint-disable-line no-param-reassign
		}
	});
	let currentNode: Node = adventure.starter;
	const log: Array<LogEntry> = [];
	const player: ?Character = resolvedParticipants.find(_ => _._uid === playerId);
	if (!player) {
		throw new Error('Player not found');
	}
	Object.keys(save || {}).forEach((saveKey: string) => {
		// Iterate through all save steps
		const saveStep: SaveStep = save[saveKey];
		const node = adventure[saveStep._nodeRef];
		const actingPlayer: ?Character =
			resolvedParticipants.find(_ => _._uid === saveStep._characterRef);
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
				text: resolveText({
					character: actingPlayer,
					globalTags,
					template: node.text,
				}),
				timestamp,
			});
			// Add all player interactions on this node to the log
			const saveSteps: Array<SaveStep> = Object.keys(save).map(_ => save[_]);
			const allPlayerSavesOnThisNode = saveSteps.filter(_ => _._nodeRef === node.id);
			const logEntries: Array<LogEntry> =
				allPlayerSavesOnThisNode.map((currentSaveStep: SaveStep, index: number) => {
					const action: ResultingAction = allActions.find(_ => _.id === currentSaveStep._actionID);
					const option: Option = node.options.find(_ => _.resultingAction.id === action.id);
					const actionPlayer: Character =
						resolvedParticipants.find(_ => _._uid === currentSaveStep._characterRef);
					return {
						text: resolveText({
							character: actionPlayer,
							globalTags,
							template: option.logText || option.text,
						}),
						timestamp: timestamp + (index + 1),
					};
				});
			logEntries.forEach(_ => log.push(_));
		}
	});
	return {
		globalTags,
		characters: resolvedParticipants,
		player,
		currentNode,
		log,
	};
};

export default resolveGameState;
