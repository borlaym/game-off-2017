import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import NodeBuilder from '../components/node-builder';
import Node from '../components/node';
import Option from '../components/node/option';
import sampleNode from '../../docs/node-structure.json';
import samplePlayer from '../../docs/character-structure.json';

const tags = ['BRAVE', 'COWARD', 'ALIEN', 'CYBORG'].map(_ => ({ id: _, display: _ }));

const globalTags = [{
	"name": "ALIEN EGG IS THERE",
	"text": "There is an alien egg in the engine room",
	"visibility": "HIDDEN"
}];

storiesOf('NodeBuilder', module).add('', () => <NodeBuilder tags={tags} onChange={action('change')} />);
storiesOf('Node', module)
.add('Basic', () => (
	<Node
		node={sampleNode}
		player={samplePlayer}
		globalTags={globalTags}
		onAction={action('action')}
	/>
))
.add('Resolved', () => (
	<Node
		node={sampleNode}
		player={samplePlayer}
		globalTags={globalTags}
		onAction={action('action')}
		resolution={sampleNode.options[0]}
	/>
));
storiesOf('Option', module)
.add('Basic', () => (
	<Option
		option={sampleNode.options[0]}
		player={samplePlayer}
		onSelect={action('click')}
	/>
))
	