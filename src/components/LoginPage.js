import React from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Link to="/">Go Back</Link>
        <input
          type="text"
          name="username"
          required={true}
          value={this.state.username}
          onChange={event => {
            this.setState({ username: event.target.value });
          }}
        />
        <input
          type="password"
          name="password"
          required={true}
          value={this.state.password}
          onChange={event => {
            this.setState({ password: event.target.value });
          }}
        />
        <button>Login</button>
      </div>
    );
  }
}

export default LoginPage;
