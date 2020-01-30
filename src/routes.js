import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import importedComponent from "react-imported-component";

import SellerDetails from "./pages/SellerDetails/index";
import ClientDetails from "./pages/ClientDetails/index";
// import ProductDetails from "./pages/ProductDetails/index";
// import ContractOptions from "./pages/ContractOptions/index";
// import HidraulicDetails from "./pages/HidraulicDetails/index";
// import PaymentDetails from "./pages/PaymentDetails/index";
// import FreightDetails from "./pages/FreightDetails/index";
// import OtherDetails from "./pages/OtherDetails/index";
// import Confirm from "./pages/Confirm/index";
// import Success from "./pages/Success/index";

const AsyncNoMatch = importedComponent(() => import("./pages/NoMatch/index"));

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={SellerDetails} />
          <Route exact path="/clientdetails" component={ClientDetails} />
          <Route component={AsyncNoMatch} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
