import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Auth from './components/auth/index';

class App extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
					<header className="App-header">
						<h1 className="App-title">Welcome to the academy!</h1>
						<Auth />
					</header>
					<p className="App-intro">
						To get started, edit <code>src/App.js</code> and save to
						reload.
					</p>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
