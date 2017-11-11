import * as React from 'react';
import TagBuilder from '../tag-builder';
import firebase from '../../firebase';

export default class TagPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleSave = this.handleSave.bind(this);
	}

	handleSave(tagData) {
		const db = firebase.database();
		db.ref(`tags/${tagData.name}`).set(tagData);
	}

	componentDidMount() {
		if (this.props && this.props.tag) {
			this.setState({
				loading: true
			});
			const db = firebase.database();
			db.ref(`tags/${this.props.tag}`).once('value').then((snapshot) => {
				this.setState({
					tag: snapshot.val(),
					loading: false
				});
			});
		}
	}

	render() {
		if (this.state && this.state.loading) {
			return 'Loading...';
		}
		const tagData = this.state ? this.state.tag : {};
		console.log(tagData)
		return (
			<div>
				<h3>Tag page</h3>
				<TagBuilder onSave={this.handleSave} {...tagData} />
			</div>
		);
	}
}