import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "reactstrap/es/Container";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import dishesReducer from "./store/reducers/dishesReducer";
import ordersReducer from "./store/reducers/ordersReduser";

const rootReducer = combineReducers({
    dishes: dishesReducer,
    orders: ordersReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
  <BrowserRouter>
      <Container>
          <Provider store={store}>
              <App />
          </Provider>
      </Container>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
