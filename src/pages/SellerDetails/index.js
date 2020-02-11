import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import WindowedSelect from "react-windowed-select";

import { bindActionCreators } from "redux";
import { Creators as SelectActions } from "../../store/ducks/select_infos";

import Menu from "../../components/Menu";
import { message } from "antd";

function SellerDetails({
  vendedor,
  naturezaOperacao,
  toggleSeller,
  toggleON,
  sellers,
  operation_natures,
  history,
  handleSubmit,
  submitting
}) {
  async function showResults() {
    if (!vendedor || !naturezaOperacao) {
      message.error("Preencha todos os campos obrigatórios");
    } else {
      history.push(`/clientdetails`);
    }
  }

  return (
    <div>
      <Menu title="Detalhes do Vendedor" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <h3>Vendedor: *</h3>
            <WindowedSelect
              options={sellers}
              value={vendedor}
              placeholder="Selecione um vendedor"
              isClearable={true}
              getOptionLabel={option => option.name}
              onChange={changedItem => toggleSeller(changedItem)}
            />
            <br />
            <h3>Natureza da Operação: *</h3>
            <WindowedSelect
              options={operation_natures}
              value={naturezaOperacao}
              placeholder="Selecione a natureza da operação"
              isClearable={true}
              getOptionLabel={option => option.name}
              onChange={changedItem => toggleON(changedItem)}
            />
          </Container>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: 15 }}
            disabled={submitting}
          >
            Continuar
          </Button>
        </form>
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  sellers: state.bd_selects.sellers,
  operation_natures: state.bd_selects.operation_natures,
  vendedor: state.select_infos.vendedor,
  naturezaOperacao: state.select_infos.naturezaOperacao
});

SellerDetails = connect(mapStateToProps, mapDispatchToProps)(SellerDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(SellerDetails);
