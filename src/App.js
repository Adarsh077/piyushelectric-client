import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import AddClient from './Pages/AddClient';
import UpdateClient from './Pages/UpdateClient';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/addclient" component={AddClient} />
        <Route exact path="/updateclient" component={UpdateClient} />
      </Router>
    </div>
  );
}

export default App;
