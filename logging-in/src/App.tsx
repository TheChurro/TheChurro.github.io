import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import MyUchicago from "./components/MyUchicago";
import FailedCanvas from "./components/FailedCanvas";

function App() {
  return (
    <Router>
      <Route exact path="/" component={MyUchicago}/>
      <Route exact path="/bad-login" component={FailedCanvas}/>
    </Router>
  );
}

export default App;
