import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { bindActionCreators } from 'redux';

import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Creators as SelectActions } from '../../../store/ducks/select_infos';

import Menu from '../../../components/Menu';

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

const renderSwitch = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Switch
          {...input}
          checked={!!input.value}
          onChange={input.onChange}
          value="checked"
          color="primary"
        />
      }
      labelPlacement="start"
      label={label}
    />
  </div>
);

const circuit_length = [{ label: '18 M' }, { label: '24,5 M' }];

let Monofio = ({ history, handleSubmit, submitting }) => {
  async function showResults() {
    history.push(`/paymentdetails`);
  }

  return (
    <div>
      <Menu title="Detalhes do Pedido" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Field
              name="kit_instalacao"
              label="Acompanha kit de instalação (CE25P10001)?"
              type="text"
              component={renderSwitch}
            />
            <Field
              name="comprimento_circuito"
              label="Comprimento do circuito:"
              options={circuit_length}
              type="text"
              component={renderSelect}
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
  kit: state.select_infos.kit,
  maquina: state.select_infos.maquina,
});

Monofio = connect(mapStateToProps, mapDispatchToProps)(Monofio);

export default withRouter(
  reduxForm({
    form: 'infoReduxForm',
    destroyOnUnmount: false,
  })(Monofio),
);
