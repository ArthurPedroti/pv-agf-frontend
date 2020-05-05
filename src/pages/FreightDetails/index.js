import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { bindActionCreators } from "redux";
import { Creators as SelectActions } from "../../store/ducks/select_infos";

import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import Menu from "../../components/Menu";

const renderSelect = ({ input, label, options }) => (
  <div>
    <FormControl required fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <NativeSelect required {...input}>
        <option value="" />
        {options.map(option => (
          <option key={option.label}>{option.label}</option>
        ))}
      </NativeSelect>
    </FormControl>
  </div>
);

const frete = [
  { label: "AGF Equipamentos" },
  { label: "Cliente" },
  { label: "Indicar cotação" },
  { label: "Veículo" }
];

var FreightDetails = ({ history, handleSubmit, submitting }) => {
  async function showResults() {
    history.push(`/otherdetails`);
  }

  return (
    <div>
      <Menu title="Informações do Frete" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Field
              name="frete"
              label="Selecione o responsável pelo frete"
              options={frete}
              type="text"
              component={renderSelect}
            />
          </Container>
          <Link to="/paymentdetails">
            <Button variant="contained" style={{ margin: 15 }}>
              Voltar
            </Button>
          </Link>
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
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  kit: state.select_infos.kit,
  maquina: state.select_infos.maquina
});

FreightDetails = connect(mapStateToProps, mapDispatchToProps)(FreightDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(FreightDetails);
