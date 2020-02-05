import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { bindActionCreators } from "redux";

// import { Container } from './styles';

import * as CourseActions from "../../store/actions/fetchSellers";

import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
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

const RenderInput = ({ input, meta, hintText, floatingLabelText }) => (
  <div>
    <TextField
      {...input}
      fullWidth={true}
      required
      id="standard-required"
      label={floatingLabelText}
      className={meta.error && meta.touched ? "error" : ""}
    />
    {meta.error && meta.touched && <Alert severity="error">{meta.error}</Alert>}
  </div>
);

function SellerDetails({
  loadSellers,
  sellers,
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
          <Typography variant="h6">News</Typography>
        </Toolbar>
      </AppBar>
      <form onSubmit={handleSubmit(showResults)}>
        <Container maxWidth="sm">
          <Field
            name="vendedor"
            component={RenderInput}
            hintText="Nome do vendedor"
            floatingLabelText="Nome do vendedor"
          />
          <Autocomplete
            id="combo-box-demo"
            options={sellers}
            getOptionLabel={seller => seller.name}
            style={{ marginTop: 25 }}
            renderInput={params => (
              <TextField
                {...params}
                label="Vendedor"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <Field
            name="naturezaOperacao"
            component={RenderInput}
            hintText="Insira a natureza da operação"
            floatingLabelText="Natureza da operação"
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

        <button onClick={() => loadSellers()}>Teste</button>
      </form>
    </Container>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(CourseActions, dispatch);

const mapStateToProps = state => ({
  sellers: state.sellers.sellers
});

SellerDetails = connect(mapStateToProps, mapDispatchToProps)(SellerDetails);

export default reduxForm({
  form: "demo",
  destroyOnUnmount: false
})(SellerDetails);
