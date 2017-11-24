// @flow

import tmpl from 'blueimp-tmpl';
import type { Character, Tag } from '../types';

const compileTemplate = (
	template: string,
	character: Character,
): string => {
	const male = character.sex === 'male';
	return template
		.replace(/XE/g, male ? 'he' : 'she')
		.replace(/XYRS/g, male ? 'his' : 'her')
		.replace(/XYR/g, male ? 'him' : 'her')
		.replace(/NAME/g, character.name);
};

export default ({
	globalTags = [],
	character,
	template,
}: {
	globalTags: Array<Tag>,
	character: Character,
	template: string,
}): string => {
	const compiledTemplate = compileTemplate(template, character);
	return tmpl(compiledTemplate, {
		global: globalTags.reduce((acc, tag) => ({
			...acc,
			[tag.id]: true,
		}), {}),
		character: {
			...character,
			tags: character.tags.reduce((acc, tag) => ({
				...acc,
				[tag.id]: true,
			}), {}),
		},
	});
};
