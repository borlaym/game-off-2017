// @flow

import * as React from 'react';
import type { Option } from '../../types';

export default ({
	option,
	player,
	onSelect
}:{
	option: Option,
	player: Player,
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
	return (
		<div className='event-node__option' onClick={_ => onSelect(option)}>
			<p className='event-node__option__condition'>
				{visibleTags}
			</p>
			<p className='event-node__option__text'>
				{text}
			</p>
		</div>
	)
}