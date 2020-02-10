import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import { Container } from './styles';

import * as apiActions from "../../store/actions api/fetchBD";

import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";

import CircularProgress from "@material-ui/core/CircularProgress";

import Menu from "../../components/Menu";

const styles = {
  button: {
    margin: 15
  }
};

function Home({
  loadSellers,
  loadOperation_natures,
  loadClients,
  loadProducts,
  history
}) {
  async function handleSubmit() {
    await loadSellers();
    await loadOperation_natures();
    await loadClients();
    await loadProducts();

    history.push(`/sellerdetails`);
  }

  return (
    <div>
      <Menu title="Início" />
      <Container maxWidth="md" component="main" align="center">
        <Button
          type="submit"
          onSubmit={handleSubmit()}
          variant="contained"
          color="primary"
          style={styles.button}
          onClick={handleSubmit()}
        >
          Carregando
        </Button>
        <CircularProgress size={20} />
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators(apiActions, dispatch);

export default connect(null, mapDispatchToProps)(Home);
