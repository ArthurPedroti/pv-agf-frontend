import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import showResults from "./showResults";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

const styles = {
  button: {
    margin: 15
  }
};

const validate = values => {
  const errors = {};
  if (!values.prevEntrega) {
    errors.prevEntrega = "Obrigatório!";
  }
  if (!values.frete) {
    errors.frete = "Obrigatório!";
  }
  if (!values.formaPagEntrada) {
    errors.formaPagEntrada = "Obrigatório!";
  }
  return errors;
};

const RenderInput = ({ input, meta, hintText, floatingLabelText }) => (
  <Container maxWidth="sm">
    <TextField
      {...input}
      fullWidth={true}
      hintText={hintText}
      floatingLabelText={floatingLabelText}
      className={meta.error && meta.touched ? "error" : ""}
    />
    {meta.error && meta.touched && <Alert severity="error">{meta.error}</Alert>}
  </Container>
);

function FreightDetails({ vendedor, prevEntrega, frete, formaPagEntrada }) {
  return (
    <Container maxWidth="md" component="main" align="center">
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title={vendedor} />
          <h1></h1>
          <form>
            <Field
              name="prevEntrega"
              component={RenderInput}
              hintText="Insira a previsão de entrega"
              floatingLabelText="Previsão de entrega"
            />
            <Field
              name="frete"
              component={RenderInput}
              hintText="Insira o responsável pelo frete"
              floatingLabelText="Responsável pelo frete"
            />
            <Field
              name="formaPagEntrada"
              component={RenderInput}
              hintText="Insira a previsão de instalação"
              floatingLabelText="Previsão de instalação"
            />
            <Link to="/">
              <RaisedButton
                label="Back"
                primary={false}
                style={styles.button}
              />
            </Link>
            <Link to="/">
              <RaisedButton
                label="Continue"
                primary={true}
                style={styles.button}
              />
            </Link>
          </form>
        </React.Fragment>
      </MuiThemeProvider>
    </Container>
  );
}

export default reduxForm({
  form: "demo",
  destroyOnUnmount: false,
  validate
})(FreightDetails);
