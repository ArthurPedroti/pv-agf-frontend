import React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';
import ServiceWorkerWrapper from './components/swWrapper';

import Routes from './routes';

import { store, persistor } from './store';

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: grey,
  },
});

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <Routes />
          <ServiceWorkerWrapper />
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
