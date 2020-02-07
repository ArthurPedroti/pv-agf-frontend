import React from "react";
import { Link } from "react-router-dom";
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

function ClientDetails({
  clients,
  toggleClient,
  history,
  handleSubmit,
  submitting
}) {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function showResults() {
    await sleep(500); // simulate server latency
    history.push(`/freightdetails`);
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
            options={clients}
            disableClearable
            getOptionLabel={options => options.razao_social}
            onChange={e => toggleClient(e.target.innerHTML)}
            renderInput={params => (
              <TextField
                {...params}
                label="Cliente"
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />
            )}
          />
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
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  clients: state.bd_select.clients
});

ClientDetails = connect(mapStateToProps, mapDispatchToProps)(ClientDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(ClientDetails);
