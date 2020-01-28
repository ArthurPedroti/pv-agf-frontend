import React from "react";

import { connect } from "react-redux";

import SellerDetails from "./SellerDetails";
import ClientDetails from "./ClientDetails";
import ProductDetails from "./ProductDetails";
import ContractOptions from "./ContractOptions";
import HidraulicDetails from "./HidraulicDetails";
import PaymentDetails from "./PaymentDetails";
import FreightDetails from "./FreightDetails";
import OtherDetails from "./OtherDetails";
import Confirm from "./Confirm";
import Success from "./Success";

function Userform(step) {
  switch (step) {
    default:
      return <SellerDetails />;
    case 2:
      return <ClientDetails />;
    case 3:
      return <ProductDetails />;
    case 4:
      return <ContractOptions />;
    case 5:
      return <HidraulicDetails />;
    case 6:
      return <PaymentDetails />;
    case 7:
      return <FreightDetails />;
    case 8:
      return <OtherDetails />;
    case 9:
      return <Confirm />;
    case 10:
      return <Success />;
  }
}

export default connect(state => ({
  step: state.step
}))(Userform);
