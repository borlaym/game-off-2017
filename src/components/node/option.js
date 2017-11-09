// @flow

import * as React from 'react';
import type { Option, Tag } from '../../types';
import textResolver from '../../utils/textResolver';

export default ({
	option,
	player,
	globalTags = [],
	onSelect
}:{
	option: Option,
	player: Player,
	globalTags: Array<Tag>,
	onSelect: Function
}) => {
	const {
		text,
		conditions
	} = option;
	const visibleTags = conditions
		.filter(_ => _.visibility !== 'HIDDEN')
		.map(_ => _.name)
		.join(' and ');
	const resolveText = textResolver(globalTags, player);
	return (
		<div className='event-node__option' onClick={_ => onSelect(option)}>
			<p className='event-node__option__condition'>
				{visibleTags}
			</p>
			<p className='event-node__option__text'>
				{resolveText(text)}
			</p>
		</div>
	)
}