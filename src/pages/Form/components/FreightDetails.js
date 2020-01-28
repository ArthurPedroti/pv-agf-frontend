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
          <AppBar title="Frete" />
          <TextField
            hintText="Insira a previsão de entrega"
            floatingLabelText="Previsão de entrega"
            onChange={handleChange("prevEntrega")}
            defaultValue={values.prevEntrega}
          />
          <br />
          <TextField
            hintText="Insira o responsável pelo frete"
            floatingLabelText="Responsável pelo frete"
            onChange={handleChange("frete")}
            defaultValue={values.frete}
          />
          <br />
          <TextField
            hintText="Insira a previsão de instalação"
            floatingLabelText="Previsão de instalação"
            onChange={handleChange("formaPagEntrada")}
            defaultValue={values.formaPagEntrada}
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
