import React from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import AddClient from "./Pages/AddClient";
import UpdateClient from "./Pages/UpdateClient";
import Login from "./Pages/Login/Login";

const Main = withRouter(({ location: { pathname }, history }) => {
  return (
    <div>
      {pathname !== "/login" && <Navbar history={history} />}
      <Route exact path="/" component={Home} />
      <Route exact path="/addclient" component={AddClient} />
      <Route exact path="/updateclient" component={UpdateClient} />
      <Route exact path="/login" component={Login} />
    </div>
  );
});

export default () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};
