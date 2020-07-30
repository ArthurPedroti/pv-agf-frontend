import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form';

import { bindActionCreators } from 'redux';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Creators as PaymentActions } from '../../store/ducks/paymentList';
import Menu from '../../components/Menu';
import ManualPayment from './components/Manual';
import AutomaticPayment from './components/Automatic';

let PaymentDetails = ({
  produtos,
  parcelas,
  values,
  paymentList,
  submitting,
  history,
}) => {
  const [errors, setErrors] = useState({});

  const renderSwitch = useCallback(
    ({ input, label }) => (
      <div>
        <FormControlLabel
          control={
            <Switch
              {...input}
              checked={!!input.value}
              onChange={input.onChange}
              onClick={() => setErrors({})}
              value="checked"
              color="primary"
            />
          }
          labelPlacement="start"
          label={label}
        />
      </div>
    ),
    [],
  );

  const handleSubmit = useCallback(() => {
    const mapProducts =
      produtos && produtos.map(produto => produto.value * produto.qtd);
    const sumProducts =
      mapProducts && mapProducts.length > 0
        ? mapProducts.reduce((a, b) => a + b)
        : 0;
    let sumPayments;
    if (!values.payment_type) {
      if (!values.entrada) {
        return setErrors({ error: 'Preencha o método de pagamento' });
      }
      if (
        (values.num_parcelas && values.int_parcelas) ||
        (!values.num_parcelas && !values.int_parcelas)
      ) {
        return history.push('/freightdetails');
      }
      return setErrors({
        error: 'Preenchar o numero e o intervalo das parcelas',
      });
    }
    if (paymentList.length > 0) {
      const mapPayments = parcelas.map(parcela => parcela.value);
      sumPayments =
        mapPayments.length > 0
          ? Number(parseFloat(mapPayments.reduce((a, b) => a + b)).toFixed(2))
          : 0;
      if (sumProducts === sumPayments) {
        return history.push('/freightdetails');
      }
      return setErrors({
        error:
          'O valor total dos produtos não coincide com o valor total das parcelas!',
      });
    }
    return setErrors({ error: 'Insira pelo menos uma parcela!' });
  }, [
    history,
    produtos,
    parcelas,
    paymentList.length,
    values.payment_type,
    values.entrada,
    values.num_parcelas,
    values.int_parcelas,
  ]);

  const BackButton = useCallback(() => {
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
  }, [values]);

  const PaymentOptions = useCallback(() => {
    if (values.payment_type) {
      return <ManualPayment />;
    }
    return <AutomaticPayment />;
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
        <Typography variant="overline" display="block" gutterBottom>
          {errors.error}
        </Typography>
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

const mapStateToProps = state => ({
  values: getFormValues('infoReduxForm')(state),
  produtos: state.productList,
  paymentList: state.paymentList,
  parcelas: state.paymentList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(PaymentActions, dispatch);

PaymentDetails = connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);

export default reduxForm({
  form: 'infoReduxForm',
  destroyOnUnmount: false,
})(PaymentDetails);
