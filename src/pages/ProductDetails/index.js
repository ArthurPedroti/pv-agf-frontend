import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import { reduxForm } from "redux-form";
import { bindActionCreators } from "redux";
import { Field, FieldArray, reduxForm } from "redux-form";

// import { Container } from './styles';

import { Creators as SelectActions } from "../../store/ducks/select_infos";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import Menu from "../../components/Menu";

import { Autocomplete, TextInputField } from "evergreen-ui";

const styles = {
  button: {
    margin: 15
  }
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderHobbies = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Hobby
      </button>
    </li>
    {fields.map((hobby, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Hobby"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={hobby}
          type="text"
          component={renderField}
          label={`Hobby #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Member
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        />
        <h4>Member #{index + 1}</h4>
        <Field
          name={`${member}.firstName`}
          type="text"
          component={renderField}
          label="First Name"
        />
        <Field
          name={`${member}.lastName`}
          type="text"
          component={renderField}
          label="Last Name"
        />
        <FieldArray name={`${member}.hobbies`} component={renderHobbies} />
      </li>
    ))}
  </ul>
);

function ProductDetails({
  handleSubmit,
  pristine,
  reset,
  submitting,
  history
}) {
  async function showResults() {
    history.push(`/`);
  }

  //const clients_map = clients.map(x => x.razao_social);

  return (
    <div>
      <Menu title="Detalhes dos Produtos" />

      <Container maxWidth="md" component="main" align="center">
        <Container maxWidth="sm" align="left">
          <form onSubmit={handleSubmit}>
            <FieldArray name="members" component={renderMembers} />
            <div>
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                disabled={pristine || submitting}
                onClick={reset}
              >
                Clear Values
              </button>
            </div>
          </form>
        </Container>
        <Link to="/clientdetails">
          <Button variant="contained" style={styles.button}>
            Voltar
          </Button>
        </Link>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={styles.button}
          disabled={submitting}
        >
          Continue
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          style={styles.button}
          disabled={submitting}
        >
          Cadastrar Cliente
        </Button>
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  clients: state.bd_selects.clients,
  cliente: state.select_infos.cliente
});

ProductDetails = connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(ProductDetails);
