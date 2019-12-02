import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, withRouter} from "react-router-dom";
import Router from "./Components/Router";

function App() {
  return (
      <BrowserRouter>
        <Router />
      </BrowserRouter>
  );
}

export default App;

