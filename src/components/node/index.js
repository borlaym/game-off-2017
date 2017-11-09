// @flow

import * as React from 'react';
import type { Node, Tag, Option } from '../../types';
import OptionComponent from './option';
import intersection from 'lodash/intersection';
import textResolver from '../../utils/textResolver';

export default ({
	node,
	player,
	globalTags,
	onAction,
	resolution
}:{
	node: Node,
	player: Player,
	globalTags: Array<Tag>,
	onAction: Function,
	resolution?: Option
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
	const resolveText = textResolver(globalTags, player);
	return (
		<div className='event-node'>
			<div className='event-node__text'>
				{resolveText(text)}
			</div>
			{ resolution ? (
				<div className='event-node__result'>
					{resolveText(resolution.logText)}
				</div>
			) : (
				<div className='event-node__options'>
					{visibleOptions.map(option => (
						<OptionComponent
							key={option.id}
							player={player}
							globalTags={globalTags}
							option={option}
							onSelect={_ => onAction(_)}
						/>
					))}
				</div>
			)}
		</div>
	)
}