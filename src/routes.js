import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = ({ user }) =>
	user ? <p>Welcome {user.displayName}!</p> : <p>Please log in.</p>;

export default [
	{
		path: '/',
		component: Home
	}
];
