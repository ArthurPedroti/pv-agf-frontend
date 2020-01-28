import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import api from "../../../services/api";

const styles = {
  button: {
    margin: 15
  }
};

function toggleSeller(step, vendedor, naturezaOperacao) {
  return {
    type: "TOGGLE_SELLER",
    step,
    vendedor,
    naturezaOperacao
  };
}

function SellerDetails({ step, vendedor, naturezaOperacao, dispatch }) {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    async function loadSellers() {
      const response = await api.get("/sellers");

      setSellers(response.data);
      console.log(response.data);
    }
    loadSellers();
  });

  return (
    <MuiThemeProvider>
      <React.Fragment>
        <AppBar title="Vendedor" />
        <ul>
          {sellers.map(seller => (
            <li>{seller.name}</li>
          ))}
        </ul>
        <TextField
          hintText="Insira o nome do vendedor"
          floatingLabelText="Nome do vendedor"
          onChange={() => dispatch(toggleSeller(vendedor))}
        />
        <br />
        <TextField
          hintText="Insira a natureza da operação"
          floatingLabelText="Natureza da operação"
          onChange={() => dispatch(toggleSeller(naturezaOperacao))}
        />
        <br />
        <RaisedButton
          label="Continue"
          primary={true}
          style={styles.button}
          onClick={() => dispatch(toggleSeller((step = step + 1)))}
        />
      </React.Fragment>
    </MuiThemeProvider>
  );
}

export default connect(state => ({
  step: state.pv.step,
  vendedor: state.pv.vendedor,
  naturezaOperacao: state.pv.naturezaOperacao
}))(SellerDetails);
