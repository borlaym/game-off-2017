// @flow

import tmpl from 'blueimp-tmpl';
import type { Character, Tag } from '../types';

export default (
	globalTags: Array<Tag>,
	character: Character
) => ((template: string) => tmpl(template, {
	global: globalTags,
	player: character
}));