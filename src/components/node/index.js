// @flow

import * as React from 'react';
import type { Node, Tag } from '../../types';
import Option from './option';
import intersection from 'lodash/intersection';

export default ({
	node,
	player,
	globalTags,
	onAction
}:{
	node: Node,
	player: Player,
	globalTags: Array<Tag>,
	onAction: Function
}) => {
	const {
		text,
		options
	} = node;
	const visibleOptions = options.filter(option => {
		const fullfillsGlobalCondition =
			option.globalConditions.length === 0 ||
			intersection(globalTags.map(_ => _.name), option.globalConditions.map(_ => _.name)).length > 0;
		const fullfillsPlayerCondition =
			option.conditions.length === 0 ||
			intersection(player.tags.map(_ => _.name), option.conditions.map(_ => _.name)).length > 0;
		return fullfillsGlobalCondition && fullfillsPlayerCondition;
	});
	return (
		<div className='event-node'>
			<div className='event-node__text'>
				{text}
			</div>
			<div className='event-node__options'>
				{visibleOptions.map(option => (
					<Option
						player={player}
						option={option}
						onSelect={_ => onAction(_)}
					/>
				))}
			</div>
		</div>
	)
}