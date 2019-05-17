import React from 'react';
import MessagesPage from './MessagesPage';
import LoginPage from './LoginPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  state = {
    username: null,
    token: null,
  };

  setUserToken = (username, token) => {
    this.setState({
      username: username,
      token: token,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} render={() => <MessagesPage token={this.state.token} />} />
          <Route path="/login" render={() => <LoginPage setUserToken={this.setUserToken} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
