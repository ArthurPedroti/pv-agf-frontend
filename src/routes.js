import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import importedComponent from "react-imported-component";

import Start from "./pages/Home";
import SellerDetails from "./pages/SellerDetails";
import ClientDetails from "./pages/ClientDetails";
import ProductDetails from "./pages/ProductDetails";
import ContractOptions from "./pages/ContractOptions";
import HidraulicDetails from "./pages/HidraulicDetails";
import PaymentDetails from "./pages/PaymentDetails";

const AsyncNoMatch = importedComponent(() => import("./pages/NoMatch"));

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/sellerdetails" component={SellerDetails} />
          <Route exact path="/clientdetails" component={ClientDetails} />
          <Route exact path="/productdetails" component={ProductDetails} />
          <Route exact path="/contractoptions" component={ContractOptions} />
          <Route exact path="/hidraulicdetails" component={HidraulicDetails} />
          <Route exact path="/paymentdetails" component={PaymentDetails} />
          <Route exact path="/freightdetails" component={null} />
          <Route exact path="/otherdetails" component={null} />
          <Route exact path="/confirm" component={null} />
          <Route exact path="/success" component={null} />
          <Route component={AsyncNoMatch} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
