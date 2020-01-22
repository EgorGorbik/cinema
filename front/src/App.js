import './App.css';
import React from "react";
import {store} from "./Redux/Store/configureStore";
import { Provider } from 'react-redux';
import Router from "./Components/Router/Router";
import {BrowserRouter} from "react-router-dom";
import {createBrowserHistory} from 'history';
import Initialization from "./Components/Initialization";
const browserHistory = createBrowserHistory();

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter history={browserHistory}>
              <Initialization/>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
