import React from "react";
import { Link } from "react-router-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as SellerActions from "../../store/actions/toggleSeller";

const styles = {
  button: {
    margin: 15
  }
};

// import { Container } from './styles';

function SellerDetails({ vendedor, naturezaOperacao, toggleSeller }) {
  return (
    <Container maxWidth="md" component="main" align="center">
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
          <Link to="/clientdetails">
            <RaisedButton
              label="Continue"
              primary={true}
              style={styles.button}
            />
          </Link>
        </React.Fragment>
      </MuiThemeProvider>
    </Container>
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
