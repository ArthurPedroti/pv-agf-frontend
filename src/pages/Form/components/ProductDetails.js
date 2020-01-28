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
          <AppBar title="Produtos" />
          <TextField
            hintText="Insira o código do produto 1"
            floatingLabelText="Código do produto 1"
            onChange={handleChange("codigo1")}
            defaultValue={values.codigo1}
          />
          <br />
          <TextField
            hintText="Insira a descrição do produto 1"
            floatingLabelText="Descrição do produto 1"
            onChange={handleChange("produto1")}
            defaultValue={values.produto1}
          />
          <br />
          <TextField
            hintText="Insira o preço do produto 1"
            floatingLabelText="Preço do produto 1"
            onChange={handleChange("preco1")}
            defaultValue={values.preco1}
          />
          <br />
          <TextField
            hintText="Insira o código do produto 2"
            floatingLabelText="Código do produto 2"
            onChange={handleChange("codigo1")}
            defaultValue={values.codigo2}
          />
          <br />
          <TextField
            hintText="Insira a descrição do produto 2"
            floatingLabelText="Descrição do produto 2"
            onChange={handleChange("produto1")}
            defaultValue={values.produto2}
          />
          <br />
          <TextField
            hintText="Insira o preço do produto 2"
            floatingLabelText="Preço do produto 2"
            onChange={handleChange("preco1")}
            defaultValue={values.preco2}
          />
          <br />
          <TextField
            hintText="Insira o código do produto 3"
            floatingLabelText="Código do produto 3"
            onChange={handleChange("codigo3")}
            defaultValue={values.codigo3}
          />
          <br />
          <TextField
            hintText="Insira a descrição do produto 3"
            floatingLabelText="Descrição do produto 3"
            onChange={handleChange("produto3")}
            defaultValue={values.produto3}
          />
          <br />
          <TextField
            hintText="Insira o preço do produto 3"
            floatingLabelText="Preço do produto 3"
            onChange={handleChange("preco3")}
            defaultValue={values.preco3}
          />
          <br />
          <TextField
            hintText="Insira o código do produto 4"
            floatingLabelText="Código do produto 4"
            onChange={handleChange("codigo4")}
            defaultValue={values.codigo4}
          />
          <br />
          <TextField
            hintText="Insira a descrição do produto 4"
            floatingLabelText="Descrição do produto 4"
            onChange={handleChange("produto4")}
            defaultValue={values.produto4}
          />
          <br />
          <TextField
            hintText="Insira o preço do produto 4"
            floatingLabelText="Preço do produto 4"
            onChange={handleChange("preco4")}
            defaultValue={values.preco4}
          />
          <br />
          <TextField
            hintText="Insira o código do produto 5"
            floatingLabelText="Código do produto 5"
            onChange={handleChange("codigo5")}
            defaultValue={values.codigo5}
          />
          <br />
          <TextField
            hintText="Insira a descrição do produto 5"
            floatingLabelText="Descrição do produto 5"
            onChange={handleChange("produto5")}
            defaultValue={values.produto5}
          />
          <br />
          <TextField
            hintText="Insira o preço do produto 5"
            floatingLabelText="Preço do produto 5"
            onChange={handleChange("preco5")}
            defaultValue={values.preco5}
          />
          <br />
          <TextField
            hintText="Insira o código do produto 6"
            floatingLabelText="Código do produto 6"
            onChange={handleChange("codigo6")}
            defaultValue={values.codigo6}
          />
          <br />
          <TextField
            hintText="Insira a descrição do produto 6"
            floatingLabelText="Descrição do produto 6"
            onChange={handleChange("produto6")}
            defaultValue={values.produto6}
          />
          <br />
          <TextField
            hintText="Insira o preço do produto 6"
            floatingLabelText="Preço do produto 6"
            onChange={handleChange("preco6")}
            defaultValue={values.preco1}
          />
          <br />
          <TextField
            hintText="Insira o código do produto 7"
            floatingLabelText="Código do produto 7"
            onChange={handleChange("codigo7")}
            defaultValue={values.codigo7}
          />
          <br />
          <TextField
            hintText="Insira a descrição do produto 7"
            floatingLabelText="Descrição do produto 7"
            onChange={handleChange("produto7")}
            defaultValue={values.produto7}
          />
          <br />
          <TextField
            hintText="Insira o preço do produto 7"
            floatingLabelText="Preço do produto 7"
            onChange={handleChange("preco7")}
            defaultValue={values.preco7}
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
