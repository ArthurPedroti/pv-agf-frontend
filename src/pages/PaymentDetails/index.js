import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";

import { bindActionCreators } from "redux";
import { Creators as PaymentActions } from "../../store/ducks/paymentList";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import Menu from "../../components/Menu";

import { message } from "antd";

var PaymentDetails = ({
  values,
  paymentList,
  addPayment,
  removePayment,
  resetPayment,
  submitting,
  history,
}) => {

  const handleSubmit = (e) => {
    if (paymentList.length > 0) {
      history.push(`/freightdetails`);
    } else {
      message.error("Insira pelo menos um produto!");
    }
  };

  function BackButton() {
    if (values !== undefined) {
      if (values.tipo_contrato === "Pedido Padrão") {
        return (
          <Link to="/orderoptions">
            <Button variant="contained" style={{ margin: 15 }}>
              Voltar
            </Button>
          </Link>
        );
      }
    }
    return (
      <Link to="/orderdetails">
        <Button variant="contained" style={{ margin: 15 }}>
          Voltar
        </Button>
      </Link>
    );
  }

  return (
    <div>
      <Menu title="Detalhes do Pagamento" />

      <Container maxWidth="md" component="main" align="center">

        <BackButton />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ margin: 15 }}
          disabled={submitting}
        >
          Continuar
        </Button>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  values: getFormValues("infoReduxForm")(state),
  paymentList: state.paymentList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(PaymentActions, dispatch);

PaymentDetails = connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false,
})(PaymentDetails);
