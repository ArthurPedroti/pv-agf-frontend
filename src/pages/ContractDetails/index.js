import React from "react";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";

import Kit from "./components/Kit";
import Monofio from "./components/Monofio";

function ContractDetails({ values }) {
  return (
    <div>
      {values.tipo_contrato === "Contrato para Monofio" ? <Monofio /> : <Kit />}
    </div>
  );
}

const mapStateToProps = state => ({
  values: getFormValues("infoReduxForm")(state)
});

ContractDetails = connect(mapStateToProps)(ContractDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(ContractDetails);
