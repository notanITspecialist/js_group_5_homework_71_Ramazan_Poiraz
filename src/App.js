import React from 'react';
import NavBar from "./components/NavBar/NavBar";
import {Route, Switch} from "react-router";
import Dishes from "./components/Dishes/Dishes";
import Orders from "./components/Orders/Orders";

function App() {
  return (
      <div>
        <NavBar/>
        <Switch>
          <Route path='/' exact render={() => <h1>HOME PAGE</h1>} />
          <Route path='/Dishes' component={Dishes} />
            <Route path='/Orders' component={Orders} />
        </Switch>
      </div>
  );
}

export default App;
