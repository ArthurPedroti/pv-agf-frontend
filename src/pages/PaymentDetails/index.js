import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import NumberFormat from "react-number-format";

import { bindActionCreators } from "redux";
import { Creators as PaymentAction } from "../../store/ducks/paymentList";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";

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
  },
  form: {
    margin: 10
  }
}));

const payments = [
  { label: "À vista" },
  { label: "TED" },
  { label: "Boleto" },
  { label: "Cartão de Crédito" },
  { label: "Cheque" },
  { label: "Financiamento Bancário" }
];

function PaymentDetails({
  paymentList,
  addPayment,
  removePayment,
  submitting,
  history
}) {
  const classes = useStyles();

  const [num, setNum] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState("");
  const [condition, setCondition] = useState("");
  const [errors, setErrors] = useState({});

  const handleAdd = e => {
    e.preventDefault();

    if (!num) {
      setErrors({
        num: "Insira o numero da parcela!"
      });
    } else if (!date) {
      setErrors({
        date: "Insira a data da parcela!"
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
    } else if (!condition) {
      setErrors({
        condition: "Insira a condição da parcela!"
      });
    } else {
      setErrors({});
      addPayment(num, date, parseFloat(value), condition);
    }
    console.log(errors);
  };

  const handleSubmit = e => {
    if (paymentList.length > 0) {
      history.push(`/freightdetails`);
    } else {
      message.error("Insira pelo menos um produto!");
    }
  };

  return (
    <div>
      <Menu title="Detalhes do Pagamento" />

      <Container maxWidth="md" component="main" align="center">
        <Container>
          <section>
            <form onSubmit={handleAdd} autoComplete="off">
              <TextField
                label="Número da parcela"
                margin="normal"
                id="formatted-numberformat-input"
                onChange={e => setNum(e.target.value)}
                className={classes.form}
                type="number"
              />
              <TextField
                label="Data"
                margin="normal"
                id="formatted-numberformat-input"
                className={classes.form}
                onChange={e => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                type="date"
              />
              <TextField
                label="Valor da parcela"
                margin="normal"
                id="formatted-numberformat-input"
                className={classes.form}
                onChange={e => setValue(e.target.value)}
                InputProps={{
                  inputComponent: NumberFormatCustom
                }}
              />
              <FormControl required className={classes.form}>
                <InputLabel>Condição da parcela</InputLabel>
                <NativeSelect
                  native
                  required
                  onChange={e => setCondition(e.target.value)}
                >
                  <option value="" />
                  {payments.map(option => (
                    <option value={option.label}>{option.label}</option>
                  ))}
                </NativeSelect>
              </FormControl>

              <Typography variant="overline" display="block" gutterBottom>
                {errors.num}
                {errors.date}
                {errors.value}
                {errors.condition}
              </Typography>

              <Button type="button" variant="outlined" onClick={handleAdd}>
                Adicionar Parcela
              </Button>
            </form>
            <Container align="left">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Parcela</TableCell>
                      <TableCell align="center">Data</TableCell>
                      <TableCell align="center">Valor</TableCell>
                      <TableCell align="center">Tipo de Pagamento</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentList.map(payment => (
                      <TableRow key={payment.num}>
                        <TableCell align="center">{payment.num}</TableCell>
                        <TableCell align="center">{payment.date}</TableCell>
                        <TableCell align="center">
                          {payment.value.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL"
                          })}
                        </TableCell>
                        <TableCell align="center">
                          {payment.condition}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton aria-label="delete">
                            <DeleteOutlineIcon
                              onClick={() => removePayment(payment.id)}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </section>
          <Field
            name="info_ad_pagamento"
            label="Informações adicionais:"
            type="text"
            component={renderInput}
          />
        </Container>

        <Link to="/contractoptions">
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
  paymentList: state.paymentList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(PaymentAction, dispatch);

PaymentDetails = connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(PaymentDetails);
