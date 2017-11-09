import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import NodeBuilder from '../components/node-builder';
import Node from '../components/node';
import Option from '../components/node/option';
import sampleNode from '../../docs/node-structure.json';

const tags = ['BRAVE', 'COWARD', 'ALIEN', 'CYBORG'].map(_ => ({ id: _, display: _ }));


storiesOf('NodeBuilder', module).add('', () => <NodeBuilder tags={tags} onChange={action('change')} />);
storiesOf('Node', module).add('Basic', () => (
	<Node node={sampleNode} onAction={action('action')} />
));
storiesOf('Option', module).add('Basic', () => (
	<Option option={sampleNode.options[0]} onSelect={action('click')} />
));