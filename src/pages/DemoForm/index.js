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
  if (!values.vendedor) {
    errors.vendedor = "Obrigatório!";
  }
  if (!values.naturezaOperacao) {
    errors.naturezaOperacao = "Obrigatório!";
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

function SellerDetails({ handleSubmit, submitting }) {
  return (
    <Container maxWidth="md" component="main" align="center">
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Cadastro" />
          <form onSubmit={handleSubmit(showResults)}>
            <Field
              name="vendedor"
              component={RenderInput}
              hintText="Nome do vendedor"
              floatingLabelText="Nome do vendedor"
            />
            <Field
              name="naturezaOperacao"
              component={RenderInput}
              hintText="Insira a natureza da operação"
              floatingLabelText="Natureza da operação"
            />
            <Link to="/freightdetails">
              <RaisedButton
                label="Continue"
                primary={true}
                style={styles.button}
                type="submit"
                disabled={submitting}
              />
            </Link>
          </form>
        </React.Fragment>
      </MuiThemeProvider>
    </Container>
  );
}

const mapStateToProps = state => ({
  step: state.pedidoInfos.step,
  vendedor: state.pedidoInfos.vendedor,
  naturezaOperacao: state.pedidoInfos.naturezaOperacao
});

SellerDetails = connect(mapStateToProps)(SellerDetails);

export default reduxForm({
  form: "demo",
  destroyOnUnmount: false,
  validate
})(SellerDetails);
