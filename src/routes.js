import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import importedComponent from "react-imported-component";

import Login from "./pages/Login";
import SellerDetails from "./pages/SellerDetails";
import ClientDetails from "./pages/ClientDetails";
import ClientRegister from "./pages/ClientRegister";
import ProductDetails from "./pages/ProductDetails";
import ContractOptions from "./pages/ContractOptions";
import ContractDetails from "./pages/ContractDetails";
import PaymentDetails from "./pages/PaymentDetails";
import FreightDetails from "./pages/FreightDetails";
import OtherDetails from "./pages/OtherDetails";
import Confirm from "./pages/Confirm";
import Success from "./pages/Success";

const AsyncNoMatch = importedComponent(() => import("./pages/NoMatch"));

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/sellerdetails" component={SellerDetails} />
          <Route exact path="/clientdetails" component={ClientDetails} />
          <Route exact path="/clientregister" component={ClientRegister} />
          <Route exact path="/productdetails" component={ProductDetails} />
          <Route exact path="/contractoptions" component={ContractOptions} />
          <Route exact path="/contractdetails" component={ContractDetails} />
          <Route exact path="/paymentdetails" component={PaymentDetails} />
          <Route exact path="/freightdetails" component={FreightDetails} />
          <Route exact path="/otherdetails" component={OtherDetails} />
          <Route exact path="/confirm" component={Confirm} />
          <Route exact path="/success" component={Success} />
          <Route component={AsyncNoMatch} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
