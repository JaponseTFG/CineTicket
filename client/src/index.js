import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; //Es un componente de react que updatea sus componentes hijos con la informacion de la store
import reduxThunk from 'redux-thunk'; //Dispaych asincrono
import { createStore, applyMiddleware } from "redux";
import materializeCSS from "materialize-css/dist/css/materialize.min.css";
import keys from "./config/keys";

import App from "./components/App";
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
