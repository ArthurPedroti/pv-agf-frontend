import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import { bindActionCreators } from "redux";
import { Creators as SelectActions } from "../../store/ducks/select_infos";

import Menu from "../../components/Menu";

const renderSelect = ({ input, label, options }) => (
  <div>
    <FormControl required fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <NativeSelect native required {...input}>
        <option value="" />
        {options.map(option => (
          <option value={option.name}>{option.name}</option>
        ))}
      </NativeSelect>
    </FormControl>
  </div>
);

function SellerDetails({
  sellers,
  operation_natures,
  history,
  handleSubmit,
  submitting
}) {
  async function showResults() {
    history.push(`/clientdetails`);
  }

  return (
    <div>
      <Menu title="Informações do Vendedor" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Field
              name="vendedor"
              options={sellers}
              label="Selecione um vendedor"
              type="text"
              component={renderSelect}
            />
            <Field
              name="natureza_operacao"
              options={operation_natures}
              label="Selecione o tipo de contrato"
              type="text"
              component={renderSelect}
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
