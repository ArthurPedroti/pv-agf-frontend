import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, change, getFormValues } from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import { store } from '../../store';
import pjson from '../../../package.json';

import * as apiActions from '../../store/actions api/fetchBD';
import logo from '../../assets/logo.svg';

import { Container, LoginWrapper, TextField, Button } from './styles';

import {
  // loadSellers,
  // loadOperation_natures,
  loadSystem_clients,
  // loadSeller_clients,
  loadProducts,
  // loadKits,
  // loadMachines,
  // loadImportant_infos,
  // loadConditions,
  // loadTool_types,
  // loadPayment_methods,
  // loadFreights
} from '../../store/actions api/fetchBD';

store.dispatch(change('infoReduxForm', 'login', false));

let Login = ({ history, values }) => {
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const test = async () => {
      if (values) {
        if (values.login === true) {
          history.push('/sellerdetails');
        }
      }
      const response = await fetch('https://api.ipify.org').then(res =>
        res.text(),
      );
      localStorage.setItem('@ASA', response);
    };
    test();
  }, [history, values]);

  async function handleSubmit() {
    const reponse = await fetch('https://api.ipify.org').then(res =>
      res.text(),
    );
    localStorage.setItem('@ASA', reponse);
    if (reponse === '186.193.142.154') {
      if (values && values.login === true) {
        history.push('/sellerdetails');
        window.location.reload();
      }
      if (values && values.sync_date) {
        await store.dispatch(change('infoReduxForm', 'login', true));
        history.push('/sellerdetails');
      } else {
        setLoading(<CircularProgress />);
        await store.dispatch(change('infoReduxForm', 'login', true));
        await store.dispatch(change('infoReduxForm', 'payment_type', false));
        await store.dispatch(change('infoReduxForm', 'contrato', 'nao'));
        await store.dispatch(change('infoReduxForm', 'sync_date', new Date()));
        await store.dispatch(
          change(
            'infoReduxForm',
            'data_pc',
            new Date().toISOString().substring(0, 10),
          ),
        );

        history.push('/sellerdetails');
        window.location.reload();
      }
    }
    if (password === 'agf123') {
      if (values && values.login === true) {
        history.push('/sellerdetails');
      }
      if (values && values.sync_date) {
        await store.dispatch(change('infoReduxForm', 'login', true));
        history.push('/sellerdetails');
      } else {
        setLoading(<CircularProgress />);
        try {
          await store.dispatch(loadSystem_clients());
          await store.dispatch(loadProducts());
        } catch (err) {
          setLoading('');
          setError('Houve um erro, por favor tente novamente');
          throw new Error(err);
        }
        await store.dispatch(change('infoReduxForm', 'login', true));
        await store.dispatch(change('infoReduxForm', 'payment_type', false));
        await store.dispatch(change('infoReduxForm', 'contrato', 'nao'));
        await store.dispatch(change('infoReduxForm', 'sync_date', new Date()));
        await store.dispatch(
          change(
            'infoReduxForm',
            'data_pc',
            new Date().toISOString().substring(0, 10),
          ),
        );

        history.push('/sellerdetails');
      }
    } else {
      setError('Senha incorreta!');
    }
  }

  return (
    <div>
      <Container>
        <LoginWrapper>
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
        </LoginWrapper>
      </Container>
    </div>
  );
};

const mapStateToProps = state => ({
  values: getFormValues('infoReduxForm')(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(apiActions, dispatch);

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default reduxForm({
  form: 'infoReduxForm',
  destroyOnUnmount: false,
})(Login);
