import * as React from 'react';
import { withRouter } from 'react-router-dom';

import TagBuilder from '../tag-builder';
import { db } from '../../firebase';

class TagPage extends React.Component {
	constructor(props) {
		super(props);

		this.handleSave = this.handleSave.bind(this);
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

	handleSave(tagData) {
		const { history } = this.props;

		db
			.ref(`tags/${tagData.id}`)
			.set(tagData)
			.then(() => {
				history.push('/admin/tags/browse');
			});
	}

	render() {
		if (this.state && this.state.loading) {
			return 'Loading...';
		}
		const tagData = this.state ? this.state.tag : {};
		return (
			<div>
				<h3>Tag page</h3>
				<TagBuilder onSave={this.handleSave} {...tagData} />
			</div>
		);
	}
}

export default withRouter(TagPage);
