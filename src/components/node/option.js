// @flow

import * as React from 'react';
import type { Option, Tag, Character } from '../../types';
import resolveText from '../../utils/textResolver';

export default ({
	option,
	character,
	globalTags = [],
	onSelect,
}: {
	option: Option,
	character: Character,
	globalTags: Array<Tag>,
	onSelect: Function
}) => {
	const {
		text,
		conditions,
	} = option;
	const visibleTags = conditions
		.filter(_ => _.visibility !== 'HIDDEN')
		.map(_ => _.name)
		.join(' and ');
	const resolvedText = resolveText({
		globalTags,
		character,
		template: text,
	});
	return (
		<div className="event-node__option" onClick={_ => onSelect(option.resultingAction)}>
			<p className="event-node__option__condition">
				{visibleTags}
			</p>
			<p className="event-node__option__text">
				{resolvedText}
			</p>
		</div>
	);
};
