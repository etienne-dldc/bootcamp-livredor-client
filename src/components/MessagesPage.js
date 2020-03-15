import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MessagesPage = ({ token, username, unsetUserToken }) => {
  const [messages, setMessages] = React.useState(null);
  const [message, setMessage] = React.useState("");

  const getMessages = async () => {
    setMessages(null);
    const response = await axios.get(
      "https://livredor-api.herokuapp.com/messages"
    );
    setMessages(response.data);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    await axios.post(
      "https://livredor-api.herokuapp.com/message",
      {
        content: message
      },
      {
        headers: {
          authorization: "Bearer " + token
        }
      }
    );
    await getMessages();
    setMessage("");
  };

  React.useEffect(() => {
    getMessages();
  }, []);

  if (messages === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <button onClick={getMessages}>Refresh</button>
      {messages.slice(-20).map(message => {
        return <div key={message.id}>{message.content}</div>;
      })}
      <div>
        {token === null ? (
          <Link to="/login">Login</Link>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="message"
                value={message}
                onChange={event => {
                  setMessage(event.target.value);
                }}
              />
              <button type="submit">Send</button>
            </form>

            <p>
              Logged in as {username}
              <button
                onClick={() => {
                  unsetUserToken();
                }}
              >
                Logout
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
