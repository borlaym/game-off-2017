import * as React from 'react';
import { Link } from 'react-router-dom';

import { db } from '../../firebase';

export default class BrowseTagPage extends React.Component {
	componentDidMount() {
		db
			.ref('tags')
			.once('value')
			.then(snapshot => this.setState({ tags: snapshot.val() }));
	}

	render() {
		if (!this.state || !this.state.tags) {
			return 'Loading...';
		}
		return (
			<div>
				<h3>Browse tags</h3>
				<Link to="/admin/tags/create">Create Tag</Link>
				<ul>
					{Object.keys(this.state.tags).map(tag => (
						<li>
							<Link key={tag} to={`/admin/tags/edit/${tag}`}>
								{tag}
							</Link>
						</li>
					))}
				</ul>
			</div>
		);
	}
}
