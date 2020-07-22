import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import SellerDetails from './pages/SellerDetails';
import ClientDetails from './pages/ClientDetails';
import ClientRegister from './pages/ClientRegister';
import ProductDetails from './pages/ProductDetails';
import OrderOptions from './pages/OrderOptions';
import OrderDetails from './pages/OrderDetails';
import PaymentDetails from './pages/PaymentDetails';
import FreightDetails from './pages/FreightDetails';
import OtherDetails from './pages/OtherDetails';
import OrdersList from './pages/OrdersList';
import Confirm from './pages/Confirm';
import Success from './pages/Success';
import DifferentialRateCalculator from './pages/DifferentialRateCalculator';

import AsyncNoMatch from './pages/NoMatch';

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
          <Route exact path="/orderoptions" component={OrderOptions} />
          <Route exact path="/orderdetails" component={OrderDetails} />
          <Route exact path="/paymentdetails" component={PaymentDetails} />
          <Route exact path="/freightdetails" component={FreightDetails} />
          <Route exact path="/otherdetails" component={OtherDetails} />
          <Route exact path="/orderslist" component={OrdersList} />
          <Route exact path="/confirm" component={Confirm} />
          <Route exact path="/success" component={Success} />
          <Route
            exact
            path="/differential-rate-calculator"
            component={DifferentialRateCalculator}
          />
          <Route component={AsyncNoMatch} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
