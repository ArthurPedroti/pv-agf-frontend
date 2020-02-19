import React from "react";
import { Link } from "react-router-dom";
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
  loadSystem_clients,
  loadSeller_clients,
  loadProducts,
  loadKits,
  loadMachines,
  loadImportant_infos,
  loadConditions,
  loadTool_types,
  loadPayment_methods,
  loadFreights,
  history
}) {
  async function handleSubmit() {
    await loadSellers();
    await loadOperation_natures();
    await loadSystem_clients();
    await loadSeller_clients();
    await loadProducts();
    await loadKits();
    await loadMachines();
    await loadImportant_infos();
    await loadConditions();
    await loadTool_types();
    await loadPayment_methods();
    await loadFreights();

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
        <Link to="/sellerdetails">
          <Button variant="contained" style={{ margin: 15 }}>
            Continuar sem carregar
          </Button>
        </Link>

        <CircularProgress size={20} />
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators(apiActions, dispatch);

export default connect(null, mapDispatchToProps)(Home);
