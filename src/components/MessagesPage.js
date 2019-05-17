import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class MessagesPage extends React.Component {
  state = {
    messages: null,
    message: '',
  };

  getMessages = async () => {
    this.setState({ messages: null });
    const response = await axios.get('https://livredor-api.herokuapp.com/messages');
    this.setState({ messages: response.data });
  };

  handleSubmit = async event => {
    event.preventDefault();

    await axios.post(
      'https://livredor-api.herokuapp.com/message',
      {
        content: this.state.message,
      },
      {
        headers: {
          authorization: 'Bearer ' + this.props.token,
        },
      }
    );
  };

  render() {
    if (this.state.messages === null) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <button onClick={this.getMessages}>Refresh</button>
        {this.state.messages.slice(-20).map(message => {
          return <div key={message.id}>{message.content}</div>;
        })}
        <div>
          {this.props.token === null ? (
            <Link to="/login">Login</Link>
          ) : (
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="message"
                value={this.state.message}
                onChange={event => {
                  this.setState({ message: event.target.value });
                }}
              />
              <button type="submit">Send</button>
            </form>
          )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getMessages();
  }
}

export default MessagesPage;
