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
	const globalTags: Array<Tag> = [];
	let currentNode: Node = adventure.starter;
	Object.keys(party.save).forEach((saveKey: string) => {
		const saveStep = party.save[saveKey];
		console.log(saveStep);
	});
}