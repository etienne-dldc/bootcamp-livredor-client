import React from 'react';
import axios from 'axios';

class App extends React.Component {
  state = {
    messages: null,
  };

  render() {
    if (this.state.messages === null) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {this.state.messages.map(message => {
          return <div key={message.id}>{message.content}</div>;
        })}
      </div>
    );
  }

  async componentDidMount() {
    const response = await axios.get('https://livredor-api.herokuapp.com/messages');
    this.setState({ messages: response.data });
  }
}

export default App;
