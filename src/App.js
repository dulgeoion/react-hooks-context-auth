import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Header } from "./cointainers/Header";
import { LoginPage } from "./cointainers/LoginPage";
import { AuthorizedPage } from "./cointainers/AuthorizedPage";
import { IntlProvider, FormattedMessage } from "react-intl";
import { messages } from './intl'

import { useUser } from "./context";
// import

function App() {
  const { user } = useUser();

  console.log("TCL: App -> user.locale", user.locale)
  return (
    <IntlProvider locale={user.locale} messages={messages[user.locale]}>
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route
              path="/"
              component={user.isLoggedIn ? AuthorizedPage : LoginPage}
            />
            {/* <Route path="/" component={LoginPage} /> */}
          </Switch>
        </Router>
      </div>
    </IntlProvider>
  );
}

export default App;
