import * as React from 'react';
import firebase from '../../firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class BrowseTagPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const db = firebase.database();
		db.ref('tags').once('value').then(snapshot => this.setState({ tags: snapshot.val() }));
	}

	render() {
		if (!this.state || !this.state.tags) {
			return 'Loading...';
		}
		console.log(Object.keys(this.state.tags))
		return (
			<div>
				<h3>Browse tags</h3>
				<ul>
					{Object.keys(this.state.tags).map((tag) => <li><Link key={tag} to={`/admin/tags/${tag}`}>{tag}</Link></li>)}
				</ul>
			</div>
		);
	}
}