import React from "react";
import MessagesPage from "./MessagesPage";
import LoginPage from "./LoginPage";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const App = () => {
  const [username, setUsername] = React.useState(
    () => Cookies.get("username") || null
  );
  const [token, setToken] = React.useState(() => Cookies.get("token") || null);

  const unsetUserToken = React.useCallback(() => {
    setUsername(null);
    setToken(null);
    Cookies.remove("username");
    Cookies.remove("token");
  }, []);

  const setUserToken = React.useCallback((username, token) => {
    setUsername(username);
    setToken(token);
    Cookies.set("username", username);
    Cookies.set("token", token);
  }, []);

  console.log("render App", token);

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact={true}
          render={() => (
            <MessagesPage
              token={token}
              username={username}
              unsetUserToken={unsetUserToken}
            />
          )}
        />
        <Route
          path="/login"
          render={() => {
            if (token) {
              return <Redirect to="/" />;
            }
            return <LoginPage setUserToken={setUserToken} />;
          }}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
