import React from "react";
import { Link } from "react-router-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as SellerActions from "../../../store/actions/toggleSeller";

const styles = {
  button: {
    margin: 15
  }
};

function SellerDetails({ vendedor, naturezaOperacao, toggleSeller }) {
  return (
    <MuiThemeProvider>
      <React.Fragment>
        <AppBar title="Vendedor" />
        <TextField
          hintText="Insira o nome do vendedor"
          floatingLabelText="Nome do vendedor"
          onChange={e => toggleSeller(e.target.value, naturezaOperacao)}
          defaultValue={vendedor}
        />
        <br />
        <TextField
          hintText="Insira a natureza da operação"
          floatingLabelText="Natureza da operação"
          onChange={e => toggleSeller(vendedor, e.target.value)}
          defaultValue={naturezaOperacao}
        />
        <br />
        <Link to="/clientdetails"></Link>
        <RaisedButton label="Continue" primary={true} style={styles.button} />
      </React.Fragment>
    </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  step: state.pedidoInfos.step,
  vendedor: state.pedidoInfos.vendedor,
  naturezaOperacao: state.pedidoInfos.naturezaOperacao
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(SellerActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SellerDetails);
