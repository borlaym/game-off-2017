// @flow

import * as React from 'react';
import type { Node } from '../../types';
import Option from './option';

export default (props: Node) => {
	const {
		text,
		options
	} = props;
	return (
		<div className='event-node'>
			<div className='event-node__text'>
				{text}
			</div>
			<div className='event-node__options'>
				{options.map(_ => (<Option {..._} />))}
			</div>
		</div>
	)
}