import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field, FieldArray } from "redux-form";
import Select from "react-select";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import Menu from "../../components/Menu";

import { Alert, Form, Icon, Input, AutoComplete, Typography } from "antd";
const { Title } = Typography;

const renderAuto = ({ input, meta, label, dataSource, defaultValue }) => (
  <div>
    <Form.Item label={label} style={{ fontWeight: 500, marginBottom: 10 }}>
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

const renderProdutos = ({
  fields,
  dataSource,
  meta: { error, submitFailed }
}) => (
  <div>
    <Container align="center">
      <Button
        variant="contained"
        style={{ marginBottom: 20, marginTop: 20 }}
        color="primary"
        onClick={() => fields.push({})}
      >
        Adicionar Produto
      </Button>
    </Container>
    {submitFailed && error && <span>{error}</span>}
    {fields.map((produto, index) => (
      <div>
        <Title level={4} style={{ margin: 0 }}>
          Produto #{index + 1}
        </Title>

        <Field
          name={`${produto}.descricaoProduto`}
          label="Descrição do Produto *"
          type="text"
          component={renderAuto}
          dataSource={dataSource}
        />
        <Button
          variant="contained"
          style={{ marginBottom: 30 }}
          title="Remover Produto"
          onClick={() => fields.remove(index)}
        >
          Remover
        </Button>
      </div>
    ))}
  </div>
);

function produtoDetails({ products, handleSubmit, submitting, history }) {
  async function showResults() {
    history.push(`/`);
  }

  //const clients_map = clients.map(x => x.razao_social);
  const products_map = products.map(x => x.descricao);
  console.log(products);

  const sampleData = [
    { id: 1, first_name: "Aron", last_name: "Paisley", gender: "male" },
    { id: 2, first_name: "Nerissa", last_name: "Millhouse", gender: "female" },
    { id: 3, first_name: "Michael", last_name: "Schank", gender: "male" },
    { id: 4, first_name: "Velma", last_name: "Laiche", gender: "female" }
  ];

  return (
    <div>
      <Menu title="Detalhes dos Produtos" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Select
              options={products}
              getOptionLabel={option => option.descricao}
            />
            <FieldArray
              name="produtos"
              component={renderProdutos}
              dataSource={products_map}
            />
          </Container>

          <Link to="/clientdetails">
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

const mapStateToProps = state => ({
  products: state.bd_selects.products
});

produtoDetails = connect(mapStateToProps)(produtoDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(produtoDetails);
