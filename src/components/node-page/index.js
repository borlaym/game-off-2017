import * as React from 'react';
import NodeBuilder from '../node-builder';
import { db } from '../../firebase';

export default class NodePage extends React.Component {
	static handleSave(nodeData) {
		db.ref(`nodes/${nodeData.name}`).set(nodeData);
	}

	componentWillMount() {
		if (this.props && this.props.node) {
			this.setState({
				loading: true,
			});
			db
				.ref(`nodes/${this.props.node}`)
				.once('value')
				.then((snapshot) => {
					this.setState({
						node: snapshot.val(),
						loading: false,
					});
				});
		}
	}

	render() {
		if (this.state && this.state.loading) {
			return 'Loading...';
		}
		const nodeData = this.state ? this.state.node : {};
		return (
			<div className="node-page">
				<h3>Node page</h3>
				<NodeBuilder onSave={NodePage.handleSave} {...nodeData} />
			</div>
		);
	}
}
