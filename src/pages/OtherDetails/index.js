import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { bindActionCreators } from 'redux';

import { Form } from 'antd';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useCallback } from 'react';
import { Creators as SelectActions } from '../../store/ducks/select_infos';

import Menu from '../../components/Menu';

let OtherDetails = ({ history, handleSubmit, submitting }) => {
  const showResults = useCallback(() => {
    history.push('/confirm');
  }, [history]);

  const renderDate = useCallback(
    ({ input, label, type }) => (
      <div>
        <TextField
          {...input}
          label={label}
          fullWidth
          type={type}
          InputLabelProps={{ shrink: true }}
          margin="normal"
          size="small"
        />
      </div>
    ),
    [],
  );

  const renderInput = useCallback(
    ({ input, label }) => (
      <div>
        <TextField
          {...input}
          label={label}
          fullWidth
          margin="normal"
          size="small"
        />
      </div>
    ),
    [],
  );

  const radioButton = useCallback(
    ({ input, ...rest }) => (
      <RadioGroup row {...input} {...rest} value={input.value || 'não'}>
        <FormControlLabel value="nao" control={<Radio />} label="Não" />
        <FormControlLabel value="sim" control={<Radio />} label="Sim" />
      </RadioGroup>
    ),
    [],
  );

  return (
    <div>
      <Menu title="Outras informações" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Form.Item
              label="Com contrato?"
              style={{ fontWeight: 500, marginBottom: 0 }}
            />
            <Field name="contrato" component={radioButton} />
            <Field
              name="data_pc"
              label="Data do Pedido:"
              type="date"
              component={renderDate}
            />
            <Field
              name="num_contrato"
              label="Nº Contrato:"
              type="text"
              component={renderInput}
            />
            <Field
              name="num_pedido"
              label="Nº Pedido:"
              type="text"
              component={renderInput}
            />
            <Field
              name="num_nf"
              label="Nº da Nota Fiscal:"
              type="text"
              component={renderInput}
            />
            <Field
              name="num_pc"
              label="Nº do Pedido:"
              type="text"
              component={renderInput}
            />
            <Field
              name="ns"
              label="Nº de Serie:"
              type="text"
              component={renderInput}
            />
          </Container>
          <Link to="/freightdetails">
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
});

OtherDetails = connect(mapStateToProps, mapDispatchToProps)(OtherDetails);

export default reduxForm({
  form: 'infoReduxForm',
  destroyOnUnmount: false,
})(OtherDetails);
