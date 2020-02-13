import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field, getFormValues } from "redux-form";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { bindActionCreators } from "redux";
import { Creators as SelectActions } from "../../store/ducks/select_infos";

import { message } from "antd";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import Menu from "../../components/Menu";

const renderSelect = ({ input, label }) => (
  <div>
    <FormControl variant="outlined" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select {...input} fullWidth>
        <MenuItem value={"hidraulic"}>Equipamentos Hidráulicos</MenuItem>
        <MenuItem value={"others"}>Equipamentos Gerais</MenuItem>
      </Select>
    </FormControl>
  </div>
);

function ClientDetails({ formValues, history, handleSubmit, submitting }) {
  async function showResults() {
    if (formValues.tipo_contrato === "hidraulic") {
      history.push(`/hidraulicdetails`);
    } else if (formValues.tipo_contrato === "others") {
      history.push(`/paymentdetails`);
    } else {
      message.error("Selecione um tipo de contrato!");
    }
  }

  return (
    <div>
      <Menu title="Detalhes do Cliente" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Field
              name="tipo_contrato"
              label="Tipo de Contrato"
              type="text"
              component={renderSelect}
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
        </form>
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  formValues: getFormValues("infoReduxForm")(state)
});

ClientDetails = connect(mapStateToProps, mapDispatchToProps)(ClientDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(ClientDetails);
