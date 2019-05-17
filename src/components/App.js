import React from 'react';
import MessagesPage from './MessagesPage';
import LoginPage from './LoginPage';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

class App extends React.Component {
  state = {
    username: Cookies.get('username') || null,
    token: Cookies.get('token') || null,
  };

  unsetUserToken = () => {
    this.setState({
      username: null,
      token: null,
    });
    Cookies.remove('username');
    Cookies.remove('token');
  };

  setUserToken = (username, token) => {
    this.setState({
      username: username,
      token: token,
    });
    Cookies.set('username', username);
    Cookies.set('token', token);
  };

  render() {
    console.log('render App', this.state.token);

    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/"
            exact={true}
            render={() => <MessagesPage token={this.state.token} unsetUserToken={this.unsetUserToken} />}
          />
          <Route
            path="/login"
            render={() => {
              if (this.state.token) {
                return <Redirect to="/" />;
              }
              return <LoginPage setUserToken={this.setUserToken} />;
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
