// @flow

import * as React from 'react';
import type { Option } from '../../types';

export default (props: Option) => {
	const {
		text,
		conditions
	} = props;
	console.log(conditions);
	const visibleTags = conditions
		.filter(_ => _.visibility !== 'HIDDEN')
		.map(_ => _.name)
		.join(' and ');
	return (
		<div className='event-node__option'>
			<p className='event-node__option__condition'>
				{visibleTags}
			</p>
			<p className='event-node__option__text'>
				{text}
			</p>
		</div>
	)
}