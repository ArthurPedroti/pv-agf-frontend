import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import importedComponent from "react-imported-component";

import Form from "./pages/Form/index";

const AsyncNoMatch = importedComponent(() =>
  import(/* webpackChunkName:'NoMatch' */ "./pages/NoMatch/index")
);

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Form} />
          <Route component={AsyncNoMatch} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
