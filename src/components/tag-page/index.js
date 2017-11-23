import * as React from 'react';
import TagBuilder from '../tag-builder';
import { db } from '../../firebase';

export default class TagPage extends React.Component {
	static handleSave(tagData) {
		db.ref(`tags/${tagData.name}`).set(tagData);
	}

	componentWillMount() {
		if (this.props && this.props.tag) {
			this.setState({
				loading: true,
			});
			db
				.ref(`tags/${this.props.tag}`)
				.once('value')
				.then((snapshot) => {
					this.setState({
						tag: snapshot.val(),
						loading: false,
					});
				});
		}
	}

	render() {
		if (this.state && this.state.loading) {
			return 'Loading...';
		}
		const tagData = this.state ? this.state.tag : {};
		return (
			<div>
				<h3>Tag page</h3>
				<TagBuilder onSave={TagPage.handleSave} {...tagData} />
			</div>
		);
	}
}
