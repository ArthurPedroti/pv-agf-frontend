import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { Alert, Form, Icon, Input, AutoComplete } from "antd";

import Menu from "../../components/Menu";

const validate = values => {
  const errors = {};
  if (!values.cliente) {
    errors.cliente = "Obrigatório!";
  }
  return errors;
};

const renderAuto = ({ input, meta, label, dataSource, defaultValue }) => (
  <div>
    <Form.Item label={label} style={{ fontWeight: 500 }}>
      <AutoComplete
        {...input}
        dataSource={dataSource}
        style={{ width: "100%" }}
        defaultValue={defaultValue}
        filterOption={(inputValue, option) =>
          option.props.children
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
      >
        <Input
          suffix={<Icon type="search" className="certain-category-icon" />}
        />
      </AutoComplete>
      {meta.error && meta.touched && (
        <Alert message={meta.error} type="error" showIcon />
      )}
    </Form.Item>
  </div>
);

function ClientDetails({ clients, history, handleSubmit, submitting }) {
  async function showResults() {
    history.push(`/productdetails`);
  }

  const clients_map = clients.map(x => x.razao_social);

  return (
    <div>
      <Menu title="Detalhes do Cliente" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Field
              name="cliente"
              label="Cliente *"
              type="text"
              component={renderAuto}
              dataSource={clients_map}
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

const mapStateToProps = state => ({
  clients: state.bd_selects.clients
});

ClientDetails = connect(mapStateToProps)(ClientDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false,
  validate
})(ClientDetails);
