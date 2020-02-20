import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import WindowedSelect from "react-windowed-select";
import NumberFormat from "react-number-format";

import { bindActionCreators } from "redux";
import { Creators as ProductActions } from "../../store/ducks/productList";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Menu from "../../components/Menu";

import { message } from "antd";

const renderInput = ({ input, label, placeholder }) => (
  <div>
    <TextField
      {...input}
      label={label}
      placeholder={placeholder}
      fullWidth
      margin="normal"
      size="small"
    />
  </div>
);

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      isNumericString
      thousandSeparator={true}
      prefix="R$"
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: 10
  }
}));

function ProdutoDetails({
  productsSelect,
  productList,
  addProduct,
  removeProduct,
  submitting,
  history
}) {
  const classes = useStyles();

  const [products, setProducts] = useState("");
  const [value, setValue] = useState("");
  const [qtd, setQtd] = useState("");
  const [errors, setErrors] = useState({});

  const handleAdd = e => {
    e.preventDefault();

    if (!products) {
      setErrors({
        product: "Insira o produto!"
      });
    } else if (!value) {
      if (Number.isInteger(value)) {
        setErrors({
          value: "Insira um número!"
        });
      } else {
        setErrors({
          value: "Insira um valor!"
        });
      }
    } else if (!qtd) {
      setErrors({
        value: "Insira a quantidade!"
      });
    } else {
      setErrors({});
      var valueFormated = value.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL"
      });
      console.log(value);
      console.log(valueFormated);

      addProduct(products, parseFloat(value), qtd);
    }
    console.log(errors);
  };

  const handleSubmit = e => {
    if (productList.length > 0) {
      history.push(`/contractoptions`);
    } else {
      message.error("Insira pelo menos um produto!");
    }
  };

  return (
    <div>
      <Menu title="Detalhes dos Produtos" />

      <Container maxWidth="md" component="main" align="center">
        <Container>
          <section>
            <form onSubmit={handleAdd}>
              <WindowedSelect
                options={productsSelect}
                getOptionLabel={option => option.descricao}
                onChange={changedItem => setProducts(changedItem)}
              />
              <TextField
                label="Valor"
                margin="normal"
                id="formatted-numberformat-input"
                onChange={e => setValue(e.target.value)}
                InputProps={{
                  inputComponent: NumberFormatCustom
                }}
              />{" "}
              <TextField
                label="Quantidade"
                margin="normal"
                type="number"
                id="formatted-numberformat-input"
                onChange={e => setQtd(e.target.value)}
              />
              <Typography variant="overline" display="block" gutterBottom>
                {errors.product}
                {errors.value}
              </Typography>
              <Button type="button" onClick={handleAdd}>
                Adicionar Produto
              </Button>
            </form>
            <Container align="left">
              <Grid item xs={12}>
                {productList.map(product => (
                  <Paper className={classes.paper} key={product.id}>
                    <h2>{product.product.descricao}</h2>
                    <h3>
                      {product.value.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL"
                      })}
                    </h3>
                    <h3>Quantidade: {product.qtd}</h3>
                    <div>
                      <Button onClick={() => removeProduct(product.id)}>
                        Remover
                      </Button>
                    </div>
                  </Paper>
                ))}
              </Grid>
              <Field
                name="info_ad_produtos"
                label="Informações adicionais:"
                type="text"
                component={renderInput}
              />
            </Container>
          </section>
        </Container>

        <Link to="/clientdetails">
          <Button variant="contained" style={{ margin: 15 }}>
            Voltar
          </Button>
        </Link>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ margin: 15 }}
          disabled={submitting}
        >
          Continuar
        </Button>
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({
  productsSelect: state.bd_selects.products,
  productList: state.productList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ProductActions, dispatch);

ProdutoDetails = connect(mapStateToProps, mapDispatchToProps)(ProdutoDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(ProdutoDetails);
