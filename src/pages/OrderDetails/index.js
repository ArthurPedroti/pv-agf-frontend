import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';

import Kit from './components/Kit';
import Monofio from './components/Monofio';
import QC from './components/QC';

let OrderDetails = ({ values }) => {
  switch (values.tipo_contrato) {
    case 'Pedido para Monofio':
      return <Monofio />;
    case 'Pedido para Kit Hidráulico':
      return <Kit />;
    case 'Pedido para Engate Rápido':
      return <QC />;
    default:
      return null;
  }
};

const mapStateToProps = state => ({
  values: getFormValues('infoReduxForm')(state),
});

OrderDetails = connect(mapStateToProps)(OrderDetails);

export default reduxForm({
  form: 'infoReduxForm',
  destroyOnUnmount: false,
})(OrderDetails);
