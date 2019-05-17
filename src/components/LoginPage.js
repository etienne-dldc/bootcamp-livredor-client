import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
        <button
          onClick={async () => {
            const response = await axios.post('https://livredor-api.herokuapp.com/login', {
              username: this.state.username,
              password: this.state.password,
            });
            this.props.setUserToken(response.data.username, response.data.token);
          }}
        >
          Login
        </button>
      </div>
    );
  }
}

export default LoginPage;
