import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import NumberFormat from 'react-number-format';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { Creators as PaymentActions } from '../../../store/ducks/paymentList';

let AutomaticPayment = () => {
  const renderInput = useCallback(({
    input, type, label, placeholder,
  }) => (
    <div>
      <TextField
        {...input}
        label={label}
        type={type}
        placeholder={placeholder}
        fullWidth
        margin="normal"
        size="small"
      />
    </div>
  ), []);

  const radioButton = useCallback(({ input, ...rest }) => (
    <RadioGroup {...input} {...rest} value={input.value || 'normal'}>
      <FormControlLabel
        value="normal"
        control={<Radio />}
        label="Normal"
      />
      <FormControlLabel
        value="ddl"
        control={<Radio />}
        label="DDL"
      />
    </RadioGroup>
  ), []);

  const NumberFormatCustom = useCallback((props) => {
    const {
      inputRef, input, input: { onChange, value }, ...other
    } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(e) => onChange(e.value)}
        type="tel"
        defaultValue={value}
        decimalSeparator=","
        thousandSeparator="."
        thousandsGroupStyle="thousand"
        isNumericString
        prefix="R$"
        allowedDecimalSeparators={false}
      />
    );
  }, []);

  return (
    <div>
      <Container>
        <Field
          name="entrada"
          label="Entrada"
          type="number"
          parse={(value) => (isNaN(parseInt(value, 10)) ? null : parseInt(value, 10))}
          component={NumberFormatCustom}
          fullWidth
          customInput={TextField}
        />
        <Field
          name="num_parcelas"
          label="Numero de parcelas"
          type="number"
          parse={(value) => (isNaN(parseInt(value, 10)) ? null : parseInt(value, 10))}
          component={renderInput}
        />
        <Field
          name="int_parcelas"
          label="Intervalo das parcelas"
          type="number"
          parse={(value) => (isNaN(parseInt(value, 10)) ? null : parseInt(value, 10))}
          component={renderInput}
        />
        <Field name="parcelas_type" component={radioButton} />
        <Field
          name="info_ad_pagamentoAuto"
          label="Informações adicionais:"
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
