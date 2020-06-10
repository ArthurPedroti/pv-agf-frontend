import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form';

import { bindActionCreators } from 'redux';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';


import { message } from 'antd';
import { Creators as PaymentActions } from '../../store/ducks/paymentList';
import Menu from '../../components/Menu';
import ManualPayment from './components/Manual';
import AutomaticPayment from './components/Automatic';


let PaymentDetails = ({
  values,
  paymentList,
  submitting,
  history,
}) => {
  const renderSwitch = useCallback(
    ({ input, label }) => (
      <div>
        <FormControlLabel
          control={(
            <Switch
              {...input}
              checked={!!input.value}
              onChange={input.onChange}
              value="checked"
              color="primary"
            />
          )}
          labelPlacement="start"
          label={label}
        />
      </div>
    ),
    [],
  );


  const handleSubmit = useCallback(
    () => {
      if (paymentList.length > 0) {
        history.push('/freightdetails');
      } else {
        message.error('Insira pelo menos um produto!');
      }
    },
    [history, paymentList.length],
  );

  const BackButton = useCallback(
    () => {
      if (values !== undefined) {
        if (values.tipo_contrato === 'Pedido Padrão') {
          return (
            <Link to="/orderoptions">
              <Button variant="contained" style={{ margin: 15 }}>
                Voltar
              </Button>
            </Link>
          );
        }
      }
      return (
        <Link to="/orderdetails">
          <Button variant="contained" style={{ margin: 15 }}>
            Voltar
          </Button>
        </Link>
      );
    },
    [values],
  );

  const PaymentOptions = useCallback(() => {
    if (values.payment_type) {
      return (
        <ManualPayment />
      );
    }
    return (
      <AutomaticPayment />
    );
  }, [values.payment_type]);

  return (
    <div>
      <Menu title="Detalhes do Pagamento" />

      <Container maxWidth="md" component="main" align="center">
        <Field
          name="payment_type"
          label="Modo manual?"
          type="text"
          component={renderSwitch}
        />
        <PaymentOptions />
        <BackButton />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ margin: 15 }}
          disabled={submitting}
        >
          Continuar
        </Button>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  values: getFormValues('infoReduxForm')(state),
  paymentList: state.paymentList,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(PaymentActions, dispatch);

PaymentDetails = connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);

export default reduxForm({
  form: 'infoReduxForm',
  destroyOnUnmount: false,
})(PaymentDetails);
