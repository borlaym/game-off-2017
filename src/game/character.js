import type { Character } from '../types';

export function defaultCharacter({ name }) {
	return {
		name,
		tags: [],
		skills: {}
	};
}
