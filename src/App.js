import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';

import AdminPage from './components/admin-page';
import TagPage from './components/tag-page';
import NodePage from './components/node-page';
import BrowseTagsPage from './components/browse-tags-page';
import Auth from './components/auth/index';
import Profile from './components/character/profile';

import { RouteWithAuth } from './components/auth';
import LoginPage from './components/auth/login';
import LogoutPage from './components/auth/logout';

const Home = (props) => {
	const { user } = props;
	return user ? <p>Welcome {user.displayName}!</p> : <p>Please log in.</p>;
};

const NoMatch = () => <h1>404</h1>;

function App() {
	return (
		<MuiThemeProvider>
			<Router>
				<Switch>
					<RouteWithAuth exact path="/" component={Home} />
					<RouteWithAuth
						exact
						path="/logout"
						component={LogoutPage}
					/>
					<Route exact path="/login" component={LoginPage} />
					<RouteWithAuth
						exact
						path="/admin"
						component={AdminPage}
					/>
					<RouteWithAuth
						exact
						path="/admin/tags/create"
						component={TagPage}
					/>
					<RouteWithAuth
						exact
						path="/admin/tags/browse"
						component={BrowseTagsPage}
					/>
					<RouteWithAuth
						exact
						path="/admin/tags/edit/:tag"
						render={({ match }) => (
							<TagPage tag={match.params.tag} />
						)}
					/>
					<RouteWithAuth
						exact
						path="/admin/nodes/create"
						component={NodePage}
					/>
					<Route component={NoMatch} />
				</Switch>
			</Router>
		</MuiThemeProvider>
	);
}

export default App;
