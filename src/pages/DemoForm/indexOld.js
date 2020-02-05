import React, { useEffect } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { bindActionCreators } from "redux";
import { AutoComplete } from "redux-form-material-ui";
import { AutoComplete as MUIAutoComplete } from "material-ui";

// import { Container } from './styles';

import * as CourseActions from "../../store/actions/fetchBD";

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

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

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

const RenderComboBox = props => (
  <div>
    <Autocomplete
      options={props.option}
      getOptionLabel={props.optionLabel}
      style={{ marginTop: 25 }}
      renderInput={params => (
        <TextField
          {...params}
          label={props.label}
          variant="outlined"
          fullWidth
        />
      )}
    />
  </div>
);

const test = (input, sellers) => (
  <div>
    <Autocomplete
      {...input}
      options={sellers}
      getOptionLabel={seller => seller.name}
      style={{ marginTop: 25 }}
      renderInput={params => (
        <TextField {...params} label="Vendedor2" variant="outlined" fullWidth />
      )}
    />
  </div>
);

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="age-native-simple">Age</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: "age",
        id: "age-native-simple"
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

function SellerDetails({
  loadSellers,
  sellers,
  operation_natures,
  classes,
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
          <Field
            name="rendercombobox"
            classes={classes}
            component={RenderComboBox}
            label="RenderComboBox"
            option={sellers}
            optionLabel={options => options.name}
          />

          <Field
            classes={classes}
            name="favoriteColor"
            component={renderSelectField}
            label="Favorite Color"
          >
            {sellers.map(seller => (
              <option value={seller.name}>{seller.name}</option>
            ))}
          </Field>
          <Field component={test} sellers={sellers} />

          <Autocomplete
            options={sellers}
            getOptionLabel={options => options.name}
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
          <Autocomplete
            options={operation_natures}
            getOptionLabel={options => options.name}
            style={{ marginTop: 25 }}
            renderInput={params => (
              <TextField
                {...params}
                label="Natureza da operação"
                variant="outlined"
                fullWidth
              />
            )}
          />
          {operation_natures.map(on => (
            <ul>
              <li>{on.name}</li>
            </ul>
          ))}
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
  sellers: state.sellers.sellers,
  operation_natures: state.operation_natures.operation_natures
});

SellerDetails = connect(mapStateToProps, mapDispatchToProps)(SellerDetails);

export default reduxForm({
  form: "demo",
  destroyOnUnmount: false
})(SellerDetails);
