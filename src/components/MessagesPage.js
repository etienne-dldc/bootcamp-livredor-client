import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class MessagesPage extends React.Component {
  state = {
    messages: null,
  };

  render() {
    if (this.state.messages === null) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {this.state.messages.slice(0, 20).map(message => {
          return <div key={message.id}>{message.content}</div>;
        })}
        <Link to="/login">Login</Link>
      </div>
    );
  }

  async componentDidMount() {
    const response = await axios.get('https://livredor-api.herokuapp.com/messages');
    this.setState({ messages: response.data });
  }
}

export default MessagesPage;
