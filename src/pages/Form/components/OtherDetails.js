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
          <AppBar title="Outras Informações" />
          <TextField
            hintText="Sim ou Não"
            floatingLabelText="Contrato"
            onChange={handleChange("contrato")}
            defaultValue={values.contrato}
          />
          <br />
          <TextField
            hintText="Insira o número do contrato"
            floatingLabelText="Número do contrato"
            onChange={handleChange("numContrato")}
            defaultValue={values.numContrato}
          />
          <br />
          <TextField
            hintText="Insira o número do pedido"
            floatingLabelText="Número do pedido"
            onChange={handleChange("numPedido")}
            defaultValue={values.numPedido}
          />
          <br />
          <TextField
            hintText="Insira o número da NF"
            floatingLabelText="Número da NF"
            onChange={handleChange("numNF")}
            defaultValue={values.numNF}
          />
          <br />
          <TextField
            hintText="Insira a data do pedido"
            floatingLabelText="Data do pedido"
            onChange={handleChange("dataPV")}
            defaultValue={values.dataPV}
          />
          <br />
          <TextField
            hintText="Insira o número de serie do pedido"
            floatingLabelText="Número de serie do pedido"
            onChange={handleChange("nsPV")}
            defaultValue={values.nsPV}
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
