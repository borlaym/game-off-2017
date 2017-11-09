// @flow

import * as React from 'react';
import type { Node } from '../../types';
import Option from './option';

export default ({
	node,
	player,
	onAction
}:{
	node: Node,
	player: Player,
	onAction: Function
}) => {
	const {
		text,
		options
	} = node;
	return (
		<div className='event-node'>
			<div className='event-node__text'>
				{text}
			</div>
			<div className='event-node__options'>
				{options.map(option => (
					<Option
						option={option}
						onSelect={_ => onAction(_)}
					/>
				))}
			</div>
		</div>
	)
}