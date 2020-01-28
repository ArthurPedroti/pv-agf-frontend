import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class FormPersonalDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Financeiro" />
          <TextField
            hintText="Insira o valor da entrada"
            floatingLabelText="Valor da entrada"
            onChange={handleChange("valorEntrada")}
            defaultValue={values.valorEntrada}
          />
          <br />
          <TextField
            hintText="Insira a data de vencimento da entrada"
            floatingLabelText="Data de vencimento da entrada"
            onChange={handleChange("dataEntrada")}
            defaultValue={values.dataEntrada}
          />
          <br />
          <TextField
            hintText="Insira a forma de pagamento da entrada"
            floatingLabelText="Forma de pagamento da entrada"
            onChange={handleChange("formaPagEntrada")}
            defaultValue={values.formaPagEntrada}
          />
          <br />
          <TextField
            hintText="Insira o numero de parcelas"
            floatingLabelText="Numero de parcelas"
            onChange={handleChange("numParcelas")}
            defaultValue={values.numParcelas}
          />
          <br />
          <TextField
            hintText="Insira o valor das parcelas"
            floatingLabelText="Valor das parcelas"
            onChange={handleChange("valorParcelas")}
            defaultValue={values.valorParcelas}
          />
          <br />
          <TextField
            hintText="Insira o vencimento das parcelas"
            floatingLabelText="Vencimento das parcelas"
            onChange={handleChange("vencParcelas")}
            defaultValue={values.vencParcelas}
          />
          <br />
          <TextField
            hintText="Insira a forma de pagamento das parcelas"
            floatingLabelText="Forma de pagamento das parcelas"
            onChange={handleChange("formaPagParcelas")}
            defaultValue={values.formaPagParcelas}
          />
          <br />
          <RaisedButton
            label="Continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
          <RaisedButton
            label="Back"
            primary={false}
            style={styles.button}
            onClick={this.back}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};
