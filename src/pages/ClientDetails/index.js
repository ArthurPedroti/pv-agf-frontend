import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { bindActionCreators } from "redux";
import { Creators as SelectActions } from "../../store/ducks/select_infos";

import WindowedSelect from "react-windowed-select";
import { Alert, Form, Input } from "antd";
import { message } from "antd";

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

const renderInput = ({ input, meta, label, dataSource, defaultValue }) => (
  <div>
    <Form.Item label={label} style={{ fontWeight: 500 }}>
      <Input {...input} />
      {meta.error && meta.touched && (
        <Alert message={meta.error} type="error" showIcon />
      )}
    </Form.Item>
  </div>
);

function ClientDetails({
  cliente,
  clients,
  toggleClient,
  history,
  handleSubmit,
  submitting
}) {
  async function showResults() {
    if (!cliente) {
      message.error("Preencha todos os campos obrigatórios");
    } else {
      history.push(`/productdetails`);
    }
  }

  return (
    <div>
      <Menu title="Detalhes do Cliente" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Form.Item
              label="Cliente *"
              style={{ fontWeight: 500, marginBottom: 0 }}
            />
            <WindowedSelect
              options={clients}
              value={cliente}
              isClearable={true}
              placeholder={"Selecione um cliente"}
              onChange={changedItem => toggleClient(changedItem)}
              getOptionLabel={option => option.razao_social}
              getOptionValue={option => option.razao_social}
            />
            <Field
              name="nome_contato"
              label="Nome do contato *"
              type="text"
              component={renderInput}
            />
            <Field
              name="cargo_contato"
              label="Cargo do contato *"
              type="text"
              component={renderInput}
            />
            <Field
              name="email_contato"
              label="Email do contato *"
              type="text"
              component={renderInput}
            />
          </Container>
          <Link to="/sellerdetails">
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
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ margin: 15 }}
            disabled={submitting}
          >
            Cadastrar Cliente
          </Button>
        </form>
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  clients: state.bd_selects.clients,
  cliente: state.select_infos.cliente
});

ClientDetails = connect(mapStateToProps, mapDispatchToProps)(ClientDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false,
  validate
})(ClientDetails);
