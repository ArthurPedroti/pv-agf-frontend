import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { bindActionCreators } from 'redux';

import TextField from '@material-ui/core/TextField';

import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Creators as SelectActions } from '../../../store/ducks/select_infos';

import Menu from '../../../components/Menu';

const renderInput = ({ input, label }) => (
  <div>
    <TextField
      {...input}
      required
      label={label}
      fullWidth
      margin="normal"
      size="small"
    />
  </div>
);

const renderInputNoReq = ({ input, label }) => (
  <div>
    <TextField
      {...input}
      label={label}
      fullWidth
      margin="normal"
      size="small"
    />
  </div>
);

const renderSelect = ({ input, label, options }) => (
  <div>
    <FormControl required fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <NativeSelect required {...input}>
        <option value="" key={Math.random()} />
        {options.map(option => (
          <option key={option.label}>{option.label}</option>
        ))}
      </NativeSelect>
    </FormControl>
  </div>
);

const machines = [
  { label: 'Mini Escavadeira' },
  { label: 'Retro' },
  { label: 'Escavadeira' },
  { label: 'Outro' },
];

let QC = ({ history, handleSubmit, submitting }) => {
  async function showResults() {
    history.push('/paymentdetails');
  }

  return (
    <div>
      <Menu title="Detalhes do Pedido" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Field
              name="maquina"
              label="Selecione uma máquina"
              options={machines}
              type="text"
              component={renderSelect}
            />
            <Field
              name="modelo"
              label="Modelo"
              type="text"
              component={renderInput}
            />
            <Field name="ano" label="Ano" type="text" component={renderInput} />
            <Field
              name="info_ad_qc"
              label="Informações adicionais:"
              type="text"
              component={renderInputNoReq}
            />
          </Container>
          <Link to="/orderoptions">
            <Button variant="contained" style={{ margin: 15 }}>
              Voltar
            </Button>
          </Link>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: 15 }}
            disabled={submitting}
          >
            Continuar
          </Button>
        </form>
      </Container>
    </div>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  values: getFormValues('infoReduxForm')(state),
});

QC = connect(mapStateToProps, mapDispatchToProps)(QC);

export default withRouter(
  reduxForm({
    form: 'infoReduxForm',
    destroyOnUnmount: false,
  })(QC),
);
