import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { bindActionCreators } from 'redux';

import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { Creators as SelectActions } from '../../store/ducks/select_infos';

import Menu from '../../components/Menu';

const renderSelect = ({ input, label, options }) => (
  <div>
    <FormControl required fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <NativeSelect required {...input}>
        <option value="" />
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

const frete = [
  { label: 'Cliente' },
  { label: 'Indicar cotação' },
  { label: 'Veículo' },
  { label: 'Outros' },
];

let FreightDetails = ({ history, handleSubmit, submitting, values }) => {
  async function showResults() {
    history.push(`/otherdetails`);
  }

  const DifferenceFreightDetails = useCallback(() => {
    if (values.freight_options) {
      return (
        <>
          <Field
            name="freight_address"
            label="Endereço:"
            type="text"
            component={renderInput}
          />
          <Field
            name="freight_neighborhood"
            label="Bairro:"
            type="text"
            component={renderInput}
          />
          <Field
            name="freight_city"
            label="Cidade:"
            type="text"
            component={renderInput}
          />
          <Field
            name="freight_uf"
            label="UF:"
            type="text"
            component={renderInput}
          />
          <Field
            name="freight_cep"
            label="CEP:"
            type="text"
            component={renderInput}
          />
          <Field
            name="freight_tel"
            label="Telefone:"
            type="text"
            component={renderInputNoReq}
          />
        </>
      );
    }
    return null;
  }, [values.freight_options]);

  return (
    <div>
      <Menu title="Informações do Frete" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Field
              name="frete"
              label="Selecione o responsável pelo frete"
              options={frete}
              type="text"
              component={renderSelect}
            />
            <Field
              name="freight_options"
              label="Frete em endereço diferente do cadastro?"
              type="text"
              component={renderSwitch}
            />
            <DifferenceFreightDetails />
          </Container>
          <Link to="/paymentdetails">
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
  kit: state.select_infos.kit,
  maquina: state.select_infos.maquina,
  values: getFormValues('infoReduxForm')(state),
});

FreightDetails = connect(mapStateToProps, mapDispatchToProps)(FreightDetails);

export default reduxForm({
  form: 'infoReduxForm',
  destroyOnUnmount: false,
})(FreightDetails);
