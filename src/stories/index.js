import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import NodeBuilder from '../components/node-builder';
import OptionBuilder from '../components/node-builder/option-builder';
import TagBuilder from '../components/tag-builder';
import TagSelector from '../components/tag-selector';
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

storiesOf('TagBuilder', module)
.add('', () => (
	<TagBuilder
		onSave={action('save')}
	/>
));

storiesOf('NodeBuilder', module)
.add('NodeBuilder', () => (
	<NodeBuilder
		tags={tags}
		onChange={action('change')}
	/>
))
.add('OptionBuilder', () => (
	<OptionBuilder
		tags={tags}
		onChange={action('change')}
	/>
));

storiesOf('TagSelector', module)
.add('Basic', () => (
	<TagSelector
		allTags={tags}
		value={[tags[0]]}
	/>
))

storiesOf('Node', module)
.add('Basic', () => (
	<Node
		node={sampleNode}
		character={samplePlayer}
		globalTags={globalTags}
		onAction={action('action')}
	/>
))
.add('Resolved', () => (
	<Node
		node={sampleNode}
		character={samplePlayer}
		globalTags={globalTags}
		onAction={action('action')}
		resolution={sampleNode.options[0]}
	/>
));

storiesOf('Option', module)
.add('Basic', () => (
	<Option
		option={sampleNode.options[0]}
		character={samplePlayer}
		onSelect={action('click')}
	/>
))
