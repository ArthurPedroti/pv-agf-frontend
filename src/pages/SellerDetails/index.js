import React from "react";
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

function SellerDetails({
  vendedor,
  naturezaOperacao,
  sellers,
  operation_natures,
  toggleSeller,
  toggleON,
  history,
  handleSubmit,
  submitting
}) {
  async function showResults() {
    history.push(`/clientdetails`);
  }

  const sellers_map = sellers.map(x => x.name);
  const operation_natures_map = operation_natures.map(x => x.name);

  return (
    <div>
      <Menu title="Detalhes do Vendedor" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Autocomplete
              onChange={changedItem => toggleSeller(changedItem)}
              selectedItem={vendedor}
              items={sellers_map}
            >
              {props => {
                const { getInputProps, getRef, inputValue, openMenu } = props;
                return (
                  <TextInputField
                    label="Vendedor"
                    placeholder="Selecione o vendedor"
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
            <Autocomplete
              onChange={changedItem => toggleON(changedItem)}
              selectedItem={naturezaOperacao}
              items={operation_natures_map}
            >
              {props => {
                const { getInputProps, getRef, inputValue, openMenu } = props;
                return (
                  <TextInputField
                    label="Natureza da operação"
                    placeholder="Selecione a natureza da operação"
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
  sellers: state.bd_selects.sellers,
  operation_natures: state.bd_selects.operation_natures,
  vendedor: state.select_infos.vendedor,
  naturezaOperacao: state.select_infos.naturezaOperacao
});

SellerDetails = connect(mapStateToProps, mapDispatchToProps)(SellerDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(SellerDetails);
