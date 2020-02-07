import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { bindActionCreators } from "redux";

// import { Container } from './styles';

import * as SelectActions from "../../store/actions/SelectActions";

import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { Autocomplete } from "@material-ui/lab";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const styles = {
  button: {
    margin: 15
  }
};

function SellerDetails({
  vendedor,
  sellers,
  operation_natures,
  toggleSeller,
  toggleON,
  history,
  handleSubmit,
  submitting
}) {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function showResults() {
    await sleep(500); // simulate server latency
    history.push(`/clientdetails`);
  }
  return (
    <Container maxWidth="md" component="main" align="center">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Vendedor</Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(showResults)}>
        <Container maxWidth="sm">
          <Autocomplete
            options={sellers}
            disableClearable
            getOptionLabel={options => options.name}
            onChange={e => toggleSeller(e.target.innerHTML)}
            renderInput={params => (
              <TextField
                {...params}
                label="Vendedor"
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />
            )}
          />
          <Autocomplete
            options={operation_natures}
            getOptionLabel={options => options.name}
            onChange={e => toggleON(e.target.innerHTML)}
            renderInput={params => (
              <TextField
                {...params}
                label="Natureza da operação"
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />
            )}
          />
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
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  sellers: state.bd_select.sellers,
  operation_natures: state.bd_select.operation_natures,
  vendedor: state.select_infos.vendedor
});

SellerDetails = connect(mapStateToProps, mapDispatchToProps)(SellerDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(SellerDetails);
