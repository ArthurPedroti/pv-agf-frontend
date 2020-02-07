import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { bindActionCreators } from "redux";

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

function ClientDetails({
  cliente,
  clients,
  toggleClient,
  history,
  handleSubmit,
  submitting
}) {
  async function showResults() {
    history.push(`/`);
  }

  const clients_map = clients.map(x => x.razao_social);

  return (
    <div>
      <Menu title="Detalhes do Cliente" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Autocomplete
              onChange={changedItem => toggleClient(changedItem)}
              selectedItem={cliente}
              items={clients_map}
            >
              {props => {
                const { getInputProps, getRef, inputValue, openMenu } = props;
                return (
                  <TextInputField
                    label="Cliente"
                    placeholder="Selecione o cliente"
                    value={inputValue}
                    innerRef={getRef}
                    size={300}
                    required={true}
                    {...getInputProps({
                      onFocus: () => {
                        openMenu();
                      }
                    })}
                  />
                );
              }}
            </Autocomplete>
          </Container>
          <Link to="/sellerdetails">
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
        </form>
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

ClientDetails = connect(mapStateToProps, mapDispatchToProps)(ClientDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(ClientDetails);
