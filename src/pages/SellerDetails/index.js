import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { Alert, Form, Icon, Input, AutoComplete } from "antd";

import Menu from "../../components/Menu";

const validate = values => {
  const errors = {};
  if (!values.vendedor) {
    errors.vendedor = "Obrigatório!";
  }
  if (!values.natureza_operacao) {
    errors.natureza_operacao = "Obrigatório!";
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

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" }
  ];
  const sellers_map = sellers.map(x => x.name);
  const operation_natures_map = operation_natures.map(x => x.name);

  return (
    <div>
      <Menu title="Detalhes do Vendedor" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Field
              name="vendedor"
              label="Vendedor *"
              type="text"
              component={renderAuto}
              dataSource={sellers_map}
            />

            <Field
              name="natureza_operacao"
              label="Natureza da operação *"
              type="text"
              component={renderAuto}
              dataSource={operation_natures_map}
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

const mapStateToProps = state => ({
  sellers: state.bd_selects.sellers,
  operation_natures: state.bd_selects.operation_natures
});

SellerDetails = connect(mapStateToProps)(SellerDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false,
  validate
})(SellerDetails);
