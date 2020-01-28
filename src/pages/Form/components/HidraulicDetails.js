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
          <AppBar title="Informações do Kit Hidráulico" />
          <TextField
            hintText="Insira o Kit"
            floatingLabelText="Kit"
            onChange={handleChange("codigoCliente")}
            defaultValue={values.codigoCliente}
          />
          <br />
          <TextField
            hintText="Insira o tipo do Kit"
            floatingLabelText="Tipo do Kit"
            onChange={handleChange("tipoKit")}
            defaultValue={values.tipoKit}
          />
          <br />
          <TextField
            hintText="Insira a máquina"
            floatingLabelText="Máquina"
            onChange={handleChange("maquina")}
            defaultValue={values.maquina}
          />
          <br />
          <TextField
            hintText="Insira o modelo"
            floatingLabelText="Modelo"
            onChange={handleChange("modelo")}
            defaultValue={values.modelo}
          />
          <br />
          <TextField
            hintText="Insira o ano"
            floatingLabelText="Ano"
            onChange={handleChange("ano")}
            defaultValue={values.ano}
          />
          <br />
          <TextField
            hintText="Sim ou Não"
            floatingLabelText="Possui engate rápido"
            onChange={handleChange("engate")}
            defaultValue={values.engate}
          />
          <br />
          <TextField
            hintText="Insira outras informações relevantes"
            floatingLabelText="Informações relevantes"
            onChange={handleChange("infoRelevantes")}
            defaultValue={values.infoRelevantes}
          />
          <br />
          <TextField
            hintText="Insira a condição de uso"
            floatingLabelText="Condições de Uso"
            onChange={handleChange("condicao")}
            defaultValue={values.condicao}
          />
          <br />
          <TextField
            hintText="Insira o tipo de ponteira"
            floatingLabelText="Tipo de ponteira"
            onChange={handleChange("tipoPonteira")}
            defaultValue={values.tipoPonteira}
          />
          <br />
          <TextField
            hintText="Sim ou Não"
            floatingLabelText="Ponteira extra?"
            onChange={handleChange("pontExtra")}
            defaultValue={values.pontExtra}
          />
          <br />
          <TextField
            hintText="Insira o quantidade de ponteiras extras"
            floatingLabelText="Quantidade de ponteiras extras"
            onChange={handleChange("qtdExtra")}
            defaultValue={values.qtdExtra}
          />
          <br />
          <TextField
            hintText="Insira o tipo de ponteiras extras"
            floatingLabelText="Tipo de ponteiras extras"
            onChange={handleChange("tipoExtra")}
            defaultValue={values.tipoExtra}
          />
          <br />
          <TextField
            hintText="Insira informações adicionais"
            floatingLabelText="Infromações adicionais"
            onChange={handleChange("infoAdiPont")}
            defaultValue={values.infoAdiPont}
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
