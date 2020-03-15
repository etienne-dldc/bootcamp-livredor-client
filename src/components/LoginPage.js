import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ setUserToken }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
      }}
    >
      <Link to="/">Go Back</Link>
      <input
        type="text"
        name="username"
        required={true}
        value={username}
        onChange={event => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="password"
        name="password"
        required={true}
        value={password}
        onChange={event => {
          setPassword(event.target.value);
        }}
      />
      <button
        onClick={async () => {
          const response = await axios.post(
            "https://livredor-api.herokuapp.com/login",
            {
              username: username,
              password: password
            }
          );
          setUserToken(response.data.username, response.data.token);
        }}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
