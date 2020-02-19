import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { bindActionCreators } from "redux";
import { Creators as SelectActions } from "../../store/ducks/select_infos";

import TextField from "@material-ui/core/TextField";

import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import Menu from "../../components/Menu";

const validate = values => {
  const errors = {};
  if (!values.nome_contato) {
    errors.nome_contato = "Obrigatório!";
  }
  if (!values.cargo_contato) {
    errors.cargo_contato = "Obrigatório!";
  }
  if (!values.email_contato) {
    errors.email_contato = "Obrigatório!";
  }

  return errors;
};

const renderInput = ({ input, label, placeholder }) => (
  <div>
    <TextField
      {...input}
      label={label}
      placeholder={placeholder}
      fullWidth
      margin="normal"
      size="small"
    />
  </div>
);

const renderSelect = ({ input, label, options }) => (
  <div>
    <FormControl required fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <NativeSelect native required {...input}>
        <option value="" />
        {options.map(option => (
          <option value={option.label}>{option.label}</option>
        ))}
      </NativeSelect>
    </FormControl>
  </div>
);

const yesno = [{ label: "Sim" }, { label: "Não" }];

function OtherDetails({ history, handleSubmit, submitting }) {
  async function showResults() {
    history.push(`/confirm`);
  }

  return (
    <div>
      <Menu title="Outras informações" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Field
              name="contrato"
              label="Possui contrato:"
              options={yesno}
              type="text"
              component={renderSelect}
            />
            <Field
              name="num_contrato"
              label="Nº Contrato:"
              type="text"
              component={renderInput}
            />
            <Field
              name="num_pedido"
              label="Nº Pedido:"
              type="text"
              component={renderInput}
            />
            <Field
              name="num_nf"
              label="Nº da Nota Fiscal:"
              type="text"
              component={renderInput}
            />
            <Field
              name="num_pc"
              label="Nº do Pedido:"
              type="text"
              component={renderInput}
            />
            <Field
              name="data_pc"
              label="Data do Pedido:"
              type="text"
              component={renderInput}
            />
            <Field
              name="ns"
              label="Nº de Serie:"
              type="text"
              component={renderInput}
            />
          </Container>
          <Link to="/freightdetails">
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
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  kit: state.select_infos.kit,
  maquina: state.select_infos.maquina
});

OtherDetails = connect(mapStateToProps, mapDispatchToProps)(OtherDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false,
  validate
})(OtherDetails);
