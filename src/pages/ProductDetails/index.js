import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import { reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { Field, FieldArray, reduxForm } from "redux-form";

// import { Container } from './styles';

import { Creators as SelectActions } from "../../store/ducks/select_infos";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import Menu from "../../components/Menu";

import { Autocomplete, TextInputField } from "evergreen-ui";
import { AutoComplete } from "antd";
import "antd/dist/antd.css";

const styles = {
  button: {
    margin: 15
  }
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderProdutos = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Adicionar Produto
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((produto, index) => (
      <li key={index}>
        <h4>Produto #{index + 1}</h4>
        <Field
          name={`${produto}.descricaoProduto`}
          type="text"
          component={renderField}
          label="Descrição do Produto"
        />
        <button
          type="button"
          title="Remover Produto"
          onClick={() => fields.remove(index)}
        >
          Remover
        </button>
      </li>
    ))}
  </ul>
);

const renderAuto = ({ input, dataSource }) => (
  <div>
    <AutoComplete
      {...input}
      style={{ width: 200 }}
      dataSource={dataSource}
      placeholder="try to type `b`"
      filterOption={(inputValue, option) =>
        option.props.children
          .toUpperCase()
          .indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  </div>
);

function ProductDetails({
  onSelect,
  onSearch,
  sellers,
  handleSubmit,
  pristine,
  reset,
  submitting,
  history
}) {
  async function showResults() {
    history.push(`/`);
  }

  //const clients_map = clients.map(x => x.razao_social);
  const sellers_map = sellers.map(x => x.name);

  return (
    <div>
      <Menu title="Detalhes dos Produtos" />

      <Container maxWidth="md" component="main" align="center">
        <Container maxWidth="sm" align="left">
          <form onSubmit={handleSubmit}>
            <FieldArray name="produtos" component={renderProdutos} />
            <div>
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Clear Values
              </button>
            </div>
            <Field
              name="autocomplete"
              type="text"
              component={renderAuto}
              dataSource={sellers_map}
              label="autocomplete"
            />
          </form>
          <AutoComplete
            style={{ width: 200 }}
            dataSource={sellers_map}
            placeholder="try to type `b`"
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
          />
        </Container>
        <Link to="/clientdetails">
          <Button variant="contained" style={styles.button}>
            Voltar
          </Button>
        </Link>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={styles.button}
          disabled={submitting}
        >
          Continue
        </Button>
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  clients: state.bd_selects.clients,
  sellers: state.bd_selects.sellers,
  cliente: state.select_infos.cliente
});

ProductDetails = connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(ProductDetails);
