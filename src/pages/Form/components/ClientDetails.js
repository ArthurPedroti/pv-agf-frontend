import React, { Component } from "react";
import { Link } from "react-router-dom";

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
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Cliente" />
          <TextField
            hintText="Insira o código do cliente"
            floatingLabelText="Código do cliente"
            onChange={() => null}
          />
          <br />
          <TextField
            hintText="Insira a razão social"
            floatingLabelText="Razão social"
            onChange={() => null}
          />
          <br />
          <TextField
            hintText="Insira o CNPJ"
            floatingLabelText="CNPJ"
            onChange={() => null}
          />
          <br />
          <TextField
            hintText="Insira a inscrição estadual"
            floatingLabelText="Inscrição estadual"
            onChange={() => null}
          />
          <br />
          <TextField
            hintText="Insira o endereço"
            floatingLabelText="Endereço"
            onChange={() => null}
          />
          <br />
          <TextField
            hintText="Insira o bairro"
            floatingLabelText="Bairro"
            onChange={() => null}
          />
          <br />
          <TextField
            hintText="Insira o município"
            floatingLabelText="Município"
            onChange={() => null}
          />
          <br />
          <TextField
            hintText="Insira o UF"
            floatingLabelText="UF"
            onChange={() => null}
          />
          <br />
          <TextField
            hintText="Insira o CEP"
            floatingLabelText="CEP"
            onChange={() => null}
          />
          <br />
          <TextField
            hintText="Insira o telefone"
            floatingLabelText="Telefone"
            onChange={() => null}
          />
          <br />
          <TextField
            hintText="Insira o celular"
            floatingLabelText="Celular"
            onChange={() => null}
          />
          <br />
          <TextField
            hintText="Insira o nome do contato"
            floatingLabelText="Nome do contato"
            onChange={() => null}
          />
          <br />
          <TextField
            hintText="Insira o cargo do contato"
            floatingLabelText="Cargo do contato"
            onChange={() => null}
          />
          <br />
          <TextField
            hintText="Insira o email do contato"
            floatingLabelText="Email do contato"
            onChange={() => null}
          />
          <br />
          <Link to="/freightdetails">
            <RaisedButton
              label="Continue"
              primary={true}
              style={styles.button}
            />
          </Link>
          <Link to="/sellerdetails">
            <RaisedButton label="Back" primary={false} style={styles.button} />
          </Link>
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
