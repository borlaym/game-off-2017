import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import firebase from './firebase';

import logo from './logo.svg';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './components/appbar';

const Home = ({ user }) =>
	user ? <p>Welcome {user.displayName}!</p> : <p>Please log in.</p>;

class App extends Component {
	state = {
		user: null
	};

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ user });
			} else {
				this.setState({ user: null });
			}
		});
	}

	render() {
		return (
			<MuiThemeProvider>
				<Router>
					<div>
						<AppBar />
						{
							<Route
								exact
								path="/"
								render={() => <Home user={this.state.user} />}
							/>
						}
					</div>
				</Router>
			</MuiThemeProvider>
		);
	}
}

export default App;
