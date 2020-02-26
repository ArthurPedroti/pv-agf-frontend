import React from "react";
import "./App.css";
import "antd/dist/antd.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import amber from "@material-ui/core/colors/amber";
import grey from "@material-ui/core/colors/grey";

import Routes from "./routes";

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
} from "./store/actions api/fetchBD";
import { store, persistor } from "./store";

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: grey
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h1: "h2",
        h2: "h2",
        h3: "h2",
        h4: "h2",
        h5: "h2",
        h6: "h2",
        subtitle1: "h2",
        subtitle2: "h2",
        body1: "span",
        body2: "span"
      }
    }
  }
});

store.dispatch(loadSellers());
store.dispatch(loadSellers());
store.dispatch(loadOperation_natures());
store.dispatch(loadSystem_clients());
store.dispatch(loadSeller_clients());
store.dispatch(loadProducts());
store.dispatch(loadKits());
store.dispatch(loadMachines());
store.dispatch(loadImportant_infos());
store.dispatch(loadConditions());
store.dispatch(loadTool_types());
store.dispatch(loadPayment_methods());
store.dispatch(loadFreights());

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <Routes />
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
