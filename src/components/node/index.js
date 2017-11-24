// @flow

import * as React from 'react';
import type { Node, Tag, Option, Character } from '../../types';
import OptionComponent from './option';
import intersection from 'lodash/intersection';
import resolveText from '../../utils/textResolver';

export default ({
	node,
	character,
	globalTags,
	onAction,
}: {
	node: Node,
	character: Character,
	globalTags: Array<Tag>,
	onAction: Function,
}) => {
	const {
		text,
		options,
	} = node;
	const visibleOptions = options.filter((option) => {
		const fullfillsGlobalCondition =
			option.globalConditions.length === 0 ||
			intersection(globalTags.map(_ => _.name), option.globalConditions.map(_ => _.name)).length > 0;
		const fullfillsPlayerCondition =
			option.conditions.length === 0 ||
			intersection(character.tags.map(_ => _.name), option.conditions.map(_ => _.name)).length > 0;
		return fullfillsGlobalCondition && fullfillsPlayerCondition;
	});
	const resolvedText = resolveText({
		globalTags,
		character,
		template: text,
	});
	return (
		<div className="event-node">
			<div className="event-node__text">
				{resolvedText}
			</div>
			<div className="event-node__options">
				{visibleOptions.map(option => (
					<OptionComponent
						key={option.id}
						character={character}
						globalTags={globalTags}
						option={option}
						onSelect={_ => onAction(_)}
					/>
				))}
			</div>
		</div>
	);
};
