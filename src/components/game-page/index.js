import * as React from 'react';
import { withRouter } from 'react-router-dom';
import Node from '../node';
import Advanture from '../../adventure.json';

class GamePage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Node
				node={Advanture['starter']}
				character={{}}
				globalTags={[]}
				onAction={action => console.log(action)}
			/>
		);
	}
}

export default withRouter(GamePage);
