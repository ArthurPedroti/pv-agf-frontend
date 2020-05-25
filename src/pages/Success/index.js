import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { bindActionCreators } from "redux";
import { Creators as OrderActions } from "../../store/ducks/orderList";

import Menu from "../../components/Menu";
import PdfMakeDefault from "../../components/PdfMakeDefault";
import PdfMakeKit from "../../components/PdfMakeKit";
import PdfMakeMonofio from "../../components/PdfMakeMonofio";

var Confirm = ({ values, addOrder, cliente, produtos, parcelas }) => {
  function PdfMake() {
    if (values !== undefined) {
      if (values.tipo_contrato === "Pedido para Kits Hidráulicos") {
        return (
          <PdfMakeKit
            cliente={cliente}
            values={values}
            produtos={produtos}
            parcelas={parcelas}
          />
        );
      }
    }
    if (values.tipo_contrato === "Pedido para Monofio") {
      console.log("mono");
      return (
        <PdfMakeMonofio
          cliente={cliente}
          values={values}
          produtos={produtos}
          parcelas={parcelas}
        />
      );
    }
    return (
      <PdfMakeDefault
        cliente={cliente}
        values={values}
        produtos={produtos}
        parcelas={parcelas}
      />
    );
  }

  return (
    <div>
      <Menu title="Impressão" />
      <Container maxWidth="md" component="main" align="center">
        <form>
          <Link to="/confirm">
            <Button variant="contained" style={{ margin: 15 }}>
              Voltar
            </Button>
          </Link>
          <PdfMake />
        </form>
      </Container>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(OrderActions, dispatch);

const mapStateToProps = (state) => ({
  values: getFormValues("infoReduxForm")(state),
  vendedor: state.select_infos.vendedor,
  naturezaOperacao: state.select_infos.naturezaOperacao,
  cliente: state.select_infos.cliente,
  produtos: state.productList,
  parcelas: state.paymentList,
});

Confirm = connect(mapStateToProps, mapDispatchToProps)(Confirm);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false,
})(Confirm);
