import React from "react";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";

import Kit from "./components/Kit";
import Monofio from "./components/Monofio";

var OrderDetails = ({ values }) => {
  return (
    <div>
      {values.tipo_contrato === "Pedido para Monofio" ? <Monofio /> : <Kit />}
    </div>
  );
};

const mapStateToProps = state => ({
  values: getFormValues("infoReduxForm")(state)
});

OrderDetails = connect(mapStateToProps)(OrderDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(OrderDetails);
