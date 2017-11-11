import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export default class Admin extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h3>Admin page</h3>
				<p><Link to="/admin/tags/create">Create new tag</Link></p>
				<p><Link to="/admin/tags/browse">Browse tags</Link></p>
				<p><Link to="/admin/nodes/create">Create new node</Link></p>
				<p><Link to="/admin/nodes/browse">Browse nodes</Link></p>
			</div>
		);
	}
}