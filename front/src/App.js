import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, withRouter} from "react-router-dom";
import Router from "./Components/Router";
import { Provider } from 'react-redux';
import {store} from "./Redux/Store/configureStore";

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
      </Provider>
  );
}

export default App;

