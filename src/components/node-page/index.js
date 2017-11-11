import * as React from 'react';
import NodeBuilder from '../node-builder';
import firebase from '../../firebase';

export default class NodePage extends React.Component {
	constructor(props) {
		super(props);
		this.handleSave = this.handleSave.bind(this);
	}

	handleSave(nodeData) {
		const db = firebase.database();
		db.ref(`nodes/${nodeData.name}`).set(nodeData);
	}

	componentDidMount() {
		if (this.props && this.props.node) {
			this.setState({
				loading: true
			});
			const db = firebase.database();
			db.ref(`nodes/${this.props.node}`).once('value').then((snapshot) => {
				this.setState({
					node: snapshot.val(),
					loading: false
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
			<div>
				<h3>Node page</h3>
				<NodeBuilder onSave={this.handleSave} {...nodeData} />
			</div>
		);
	}
}