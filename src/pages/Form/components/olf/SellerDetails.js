import React, { Component } from "react";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Vendedor" />

          <TextField
            hintText="Insira o nome do vendedor"
            floatingLabelText="Nome do vendedor"
            onChange={handleChange("vendedor")}
            defaultValue={values.vendedor}
          />
          <br />
          <TextField
            hintText="Insira a natureza da operação"
            floatingLabelText="Natureza da operação"
            onChange={handleChange("naturezaOperacao")}
            defaultValue={values.naturezaOperacao}
          />
          <br />
          <RaisedButton
            label="Continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
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
