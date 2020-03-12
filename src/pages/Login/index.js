import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { reduxForm, change, getFormValues } from "redux-form";
import { store } from "../../store";
import pjson from "../../../package.json";

import * as apiActions from "../../store/actions api/fetchBD";
import logo from "../../assets/logo.svg";
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

store.dispatch(change("infoReduxForm", "login", false));

function Login({ history, values }) {
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (values.login === true) {
      history.push(`/sellerdetails`);
    }
  }, []);

  async function handleSubmit(e) {
    if (password === "agf123") {
      if (values.login === true) {
        history.push(`/sellerdetails`);
      }
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
      await store.dispatch(change("infoReduxForm", "login", true));
      await store.dispatch(change("infoReduxForm", "sync_date", new Date()));

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
          <span>{error}</span>
          <Button onClick={handleSubmit}>Login</Button>
          <span className="version">v{pjson.version}</span>
          <span>{loading}</span>
        </Login__wrapper>
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({
  values: getFormValues("infoReduxForm")(state)
});

const mapDispatchToProps = dispatch => bindActionCreators(apiActions, dispatch);

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(Login);
