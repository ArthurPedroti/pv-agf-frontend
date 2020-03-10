import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { store } from "../../store";

import * as apiActions from "../../store/actions api/fetchBD";
import logo from "../../assets/logo.png";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Container, Login__wrapper, TextField, Button } from "./styles";

import {
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
  loadFreights
} from "../../store/actions api/fetchBD";

function Login({ history }) {
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState("");
  const [error, setError] = React.useState("");

  async function handleSubmit(e) {
    if (password === "agf123") {
      setLoading(<CircularProgress />);
      await store.dispatch(loadSellers());
      await store.dispatch(loadSellers());
      await store.dispatch(loadOperation_natures());
      await store.dispatch(loadSystem_clients());
      await store.dispatch(loadSeller_clients());
      await store.dispatch(loadProducts());
      await store.dispatch(loadKits());
      await store.dispatch(loadMachines());
      await store.dispatch(loadImportant_infos());
      await store.dispatch(loadConditions());
      await store.dispatch(loadTool_types());
      await store.dispatch(loadPayment_methods());
      await store.dispatch(loadFreights());

      history.push(`/sellerdetails`);
    } else {
      setError("Senha incorreta!");
    }
  }

  return (
    <div>
      <Container>
        <Login__wrapper>
          <img src={logo} alt="" />
          <TextField
            type="password"
            placeholder="Digite a senha"
            onChange={e => setPassword(e.target.value)}
          />
          {error}
          <Button onClick={handleSubmit}>Login</Button>
          {loading}
        </Login__wrapper>
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch => bindActionCreators(apiActions, dispatch);

export default connect(null, mapDispatchToProps)(Login);
