import * as React from 'react';
import TagBuilder from '../tag-builder';
import firebase from '../../firebase';

export default class TagPage extends React.Component {
	constructor(props) {
		super(props);
		this.handleSave = this.handleSave.bind(this);
	}

	handleSave(tag) {
		const db = firebase.database();
		db.ref(`tags/${tag.name}`).set(tag);
	}

	render() {
		return (
			<div>
				<h3>Tag page</h3>
				<TagBuilder onSave={this.handleSave} />
			</div>
		);
	}
}