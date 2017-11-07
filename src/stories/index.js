import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import NodeBuilder from '../components/node-builder';

const tags = ['BRAVE', 'COWARD', 'ALIEN', 'CYBORG'].map(_ => ({ id: _, display: _ }));

storiesOf('NodeBuilder', module).add('', () => <NodeBuilder tags={tags} onChange={action('change')} />);