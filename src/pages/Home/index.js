import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { Container } from './styles';

import * as bdActions from "../../store/actions/fetchBD";

import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

function Home({ loadSellers, loadOperation_natures, loadClients, history }) {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function handleSubmit() {
    await sleep(500); // simulate server latency
    loadSellers();
    loadOperation_natures();
    loadClients();
    history.push(`/sellerdetails`);
  }

  return (
    <Container maxWidth="md" component="main" align="center">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Início</Typography>
        </Toolbar>
      </AppBar>
      <AppBar title="Cadastro" />
      <Button
        type="submit"
        onSubmit={handleSubmit()}
        variant="contained"
        color="primary"
        onClick={handleSubmit()}
      >
        Carregar
      </Button>
    </Container>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators(bdActions, dispatch);

export default connect(null, mapDispatchToProps)(Home);
