import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { bindActionCreators } from "redux";

// import { Container } from './styles';

import * as CourseActions from "../../store/actions/fetchBD";

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
  sellers,
  operation_natures,
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
            options={sellers}
            getOptionLabel={options => options.name}
            style={{ marginTop: 25 }}
            onChange={e => console.log(e.target.innerHTML)}
            renderInput={params => (
              <TextField
                {...params}
                label="Vendedor"
                variant="outlined"
                fullWidth
                required
              />
            )}
          />
          <Autocomplete
            options={operation_natures}
            getOptionLabel={options => options.name}
            onChange={e => console.log(e.target.innerHTML)}
            style={{ marginTop: 25 }}
            renderInput={params => (
              <TextField
                {...params}
                label="Natureza da operação"
                variant="outlined"
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
          disabled={submitting}
          style={styles.button}
        >
          Continue
        </Button>
      </form>
    </Container>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(CourseActions, dispatch);

const mapStateToProps = state => ({
  sellers: state.sellers.sellers,
  operation_natures: state.operation_natures.operation_natures
});

SellerDetails = connect(mapStateToProps, mapDispatchToProps)(SellerDetails);

export default reduxForm({
  form: "demo",
  destroyOnUnmount: false
})(SellerDetails);
