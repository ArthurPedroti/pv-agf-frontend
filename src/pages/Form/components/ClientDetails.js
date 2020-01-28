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
          <AppBar title="Cliente" />
          <TextField
            hintText="Insira o código do cliente"
            floatingLabelText="Código do cliente"
            onChange={handleChange("codigoCliente")}
            defaultValue={values.codigoCliente}
          />
          <br />
          <TextField
            hintText="Insira a razão social"
            floatingLabelText="Razão social"
            onChange={handleChange("razaoSocial")}
            defaultValue={values.razaoSocial}
          />
          <br />
          <TextField
            hintText="Insira o CNPJ"
            floatingLabelText="CNPJ"
            onChange={handleChange("cnpj")}
            defaultValue={values.cnpj}
          />
          <br />
          <TextField
            hintText="Insira a inscrição estadual"
            floatingLabelText="Inscrição estadual"
            onChange={handleChange("inscricaoEstadual")}
            defaultValue={values.inscricaoEstadual}
          />
          <br />
          <TextField
            hintText="Insira o endereço"
            floatingLabelText="Endereço"
            onChange={handleChange("endereco")}
            defaultValue={values.endereco}
          />
          <br />
          <TextField
            hintText="Insira o bairro"
            floatingLabelText="Bairro"
            onChange={handleChange("bairro")}
            defaultValue={values.bairro}
          />
          <br />
          <TextField
            hintText="Insira o município"
            floatingLabelText="Município"
            onChange={handleChange("municipio")}
            defaultValue={values.municipio}
          />
          <br />
          <TextField
            hintText="Insira o UF"
            floatingLabelText="UF"
            onChange={handleChange("uf")}
            defaultValue={values.uf}
          />
          <br />
          <TextField
            hintText="Insira o CEP"
            floatingLabelText="CEP"
            onChange={handleChange("cep")}
            defaultValue={values.cep}
          />
          <br />
          <TextField
            hintText="Insira o telefone"
            floatingLabelText="Telefone"
            onChange={handleChange("telefone")}
            defaultValue={values.telefone}
          />
          <br />
          <TextField
            hintText="Insira o celular"
            floatingLabelText="Celular"
            onChange={handleChange("celular")}
            defaultValue={values.celular}
          />
          <br />
          <TextField
            hintText="Insira o nome do contato"
            floatingLabelText="Nome do contato"
            onChange={handleChange("nomeContato")}
            defaultValue={values.nomeContato}
          />
          <br />
          <TextField
            hintText="Insira o cargo do contato"
            floatingLabelText="Cargo do contato"
            onChange={handleChange("cargoContato")}
            defaultValue={values.cargoContato}
          />
          <br />
          <TextField
            hintText="Insira o email do contato"
            floatingLabelText="Email do contato"
            onChange={handleChange("emailContato")}
            defaultValue={values.emailContato}
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
