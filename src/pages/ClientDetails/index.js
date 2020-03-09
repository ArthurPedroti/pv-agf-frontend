import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field, getFormValues } from "redux-form";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { bindActionCreators } from "redux";
import { Creators as SelectActions } from "../../store/ducks/select_infos";

import WindowedSelect from "react-windowed-select";
import { Form } from "antd";
import { message } from "antd";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Menu from "../../components/Menu";

const customStyles = {
  menu: styles => ({ ...styles, zIndex: 999 }),
  container: provided => ({
    ...provided,
    marginBottom: 10
  })
};

const renderInput = ({ input, label, placeholder }) => (
  <div>
    <TextField
      {...input}
      required
      label={label}
      placeholder={placeholder}
      fullWidth
      margin="normal"
      size="small"
    />
  </div>
);

const radioButton = ({ input, ...rest }) => (
  <RadioGroup {...input} {...rest} value={input.value || "system"}>
    <FormControlLabel
      value="system"
      control={<Radio />}
      label="Cliente do Sistema"
    />
    <FormControlLabel
      value="seller"
      control={<Radio />}
      label="Cliente Cadastrado"
    />
  </RadioGroup>
);

function ClientDetails({
  values,
  cliente,
  clientList,
  system_clients,
  toggleClient,
  history,
  handleSubmit,
  submitting
}) {
  async function showResults() {
    if (!cliente) {
      message.error("Selecione o cliente!");
    } else {
      history.push(`/productdetails`);
    }
  }

  function ClientSelect(values) {
    if (values !== undefined) {
      if (values.clientType === "seller") {
        return (
          <WindowedSelect
            options={clientList}
            value={cliente}
            styles={customStyles}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: "ambar",
                primary: "black"
              }
            })}
            textFieldProps={{
              InputLabelProps: { shrink: true }
            }}
            isClearable={true}
            windowThreshold="10"
            placeholder={"Selecione um cliente"}
            onChange={changedItem => toggleClient(changedItem)}
            getOptionLabel={option => option.razao_social + " - " + option.cnpj}
          />
        );
      }
    }
    return (
      <WindowedSelect
        options={system_clients}
        value={cliente}
        styles={customStyles}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "ambar",
            primary: "black"
          }
        })}
        textFieldProps={{
          InputLabelProps: { shrink: true }
        }}
        isClearable={true}
        windowThreshold="10"
        placeholder={"Selecione um cliente"}
        onChange={changedItem => toggleClient(changedItem)}
        getOptionLabel={option => option.razao_social + " - " + option.cnpj}
      />
    );
  }

  return (
    <div>
      <Menu title="Detalhes do Cliente" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Field name="clientType" component={radioButton}></Field>
            <Form.Item
              label="Cliente *"
              style={{ fontWeight: 500, marginBottom: 0 }}
            />
            {ClientSelect(values)}

            <Field
              name="nome_contato"
              label="Nome do contato"
              type="text"
              component={renderInput}
            />
            <Field
              name="cargo_contato"
              label="Cargo do contato"
              type="text"
              component={renderInput}
            />
            <Field
              name="email_contato"
              label="Email do contato"
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
          <Link to="/clientregister">
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: 15 }}
            >
              Cadastrar Cliente
            </Button>
          </Link>
        </form>
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  values: getFormValues("infoReduxForm")(state),
  system_clients: state.bd_selects.system_clients,
  cliente: state.select_infos.cliente,
  clientList: state.clientList
});

ClientDetails = connect(mapStateToProps, mapDispatchToProps)(ClientDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(ClientDetails);
