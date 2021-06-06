import React, { useState, useEffect } from "react";
import { either, isEmpty, isNil } from "ramda";

import { ToastContainer } from "react-toastify";
import { initializeLogger } from "common/logger";

import Dashboard from "components/Dashboard";
import Login from "components/Authentication/Login";
import Signup from "components/Authentication/Signup";
import CreatePoll from "components/Polls/CreatePoll";
import ShowPoll from "components/Polls/ShowPoll";
import EditPoll from "components/Polls/EditPoll";
import PageLoader from "components/PageLoader";
import PrivateRoute from "components/Common/PrivateRoute";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { getFromLocalStorage } from "helpers/storage";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    /*eslint no-undef: "off"*/
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
    logger.info("Log from js-logger");
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/polls/new" component={CreatePoll} />
        <Route exact path="/polls/:id/show" component={ShowPoll} />
        <Route exact path="/polls/:id/edit" component={EditPoll} />
      </Switch>
    </Router>
  );
};

export default App;
