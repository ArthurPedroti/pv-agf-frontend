import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import { Creators as PaymentActions } from '../../../store/ducks/paymentList';

let AutomaticPayment = () => {
  const renderInput = useCallback(({ input, label, placeholder }) => (
    <div>
      <TextField
        {...input}
        label={label}
        placeholder={placeholder}
        fullWidth
        margin="normal"
        size="small"
      />
    </div>
  ), []);

  return (
    <div>
      <Container>
        <Field
          name="entrada"
          label="Entrada"
          type="text"
          component={renderInput}
        />
        <Field
          name="num_parcelas"
          label="Numero de parcelas"
          type="text"
          component={renderInput}
        />
        <Field
          name="valor_parcelas"
          label="Valor das parcelas"
          type="text"
          component={renderInput}
        />
        <Field
          name="int_parcelas"
          label="Intervalo das parcelas"
          type="text"
          component={renderInput}
        />
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  values: getFormValues('infoReduxForm')(state),
  paymentList: state.paymentList,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(PaymentActions, dispatch);

AutomaticPayment = connect(mapStateToProps, mapDispatchToProps)(AutomaticPayment);

export default withRouter(
  reduxForm({
    form: 'infoReduxForm',
    destroyOnUnmount: false,
  })(AutomaticPayment),
);
