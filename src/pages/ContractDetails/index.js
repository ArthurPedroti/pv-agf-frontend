import React from "react";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";

import { bindActionCreators } from "redux";
import { Creators as SelectActions } from "../../store/ducks/select_infos";

import Kit from "./components/Kit";
import Monofio from "./components/Monofio";

function ContractDetails({ values, history }) {
  function ContractType() {
    if (values.tipo_contrato === "Contrato para Monofio") {
      return <Monofio />;
    } else return <Kit />;
  }

  return (
    <div>
      <ContractType />
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  values: getFormValues("infoReduxForm")(state),
  kit: state.select_infos.kit,
  maquina: state.select_infos.maquina
});

ContractDetails = connect(mapStateToProps, mapDispatchToProps)(ContractDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(ContractDetails);
