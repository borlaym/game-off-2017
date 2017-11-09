// @flow

import tmpl from 'blueimp-tmpl';
import type { Player, Tag } from '../types';

export default (
	globalTags: Array<Tag>,
	player: Player
) => ((template: string) => tmpl(template, {
	global: globalTags,
	player
}));