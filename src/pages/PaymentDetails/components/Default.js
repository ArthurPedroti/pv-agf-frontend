import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field, getFormValues } from "redux-form";
import NumberFormat from "react-number-format";

import { bindActionCreators } from "redux";
import { Creators as PaymentActions } from "../../store/ducks/paymentList";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
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
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      type="tel"
      isNumericString
      thousandSeparator={true}
      prefix="R$"
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: 10,
  },
  form: {
    margin: 10,
  },
}));

const payments = [
  { label: "À vista" },
  { label: "TED" },
  { label: "Boleto" },
  { label: "Cartão de Crédito" },
  { label: "Cheque" },
  { label: "Financiamento Bancário" },
];

var PaymentDetails = ({
  values,
  paymentList,
  addPayment,
  removePayment,
  resetPayment,
  submitting,
  history,
}) => {
  const classes = useStyles();

  const [dateEntrada, setdateEntrada] = useState("");
  const [valueEntrada, setValueEntrada] = useState("");
  const [conditionEntrada, setConditionEntrada] = useState("");
  const [errorsEntrada, setErrorsEntrada] = useState({});

  const [num, setNum] = useState("");
  const [inter, setInter] = useState("");
  const [value, setValue] = useState("");
  const [condition, setCondition] = useState("");
  const [errors, setErrors] = useState({});

  const handleAddEntrada = (e) => {
    e.preventDefault();

    if (!dateEntrada) {
      setErrorsEntrada({
        date: "Insira a data da entrada!",
      });
    } else if (!valueEntrada) {
      if (Number.isInteger(value)) {
        setErrorsEntrada({
          value: "Insira um número!",
        });
      } else {
        setErrorsEntrada({
          value: "Insira um valor!",
        });
      }
    } else if (!conditionEntrada) {
      setErrorsEntrada({
        condition: "Insira a condição da entrada!",
      });
    } else {
      setErrorsEntrada({});

      addPayment(
        new Date(dateEntrada),
        parseFloat(valueEntrada),
        conditionEntrada
      );
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!num) {
      setErrors({
        num: "Insira o número de parcelas!",
      });
    } else if (!inter) {
      setErrors({
        inter: "Insira o intervalo de dias das parcelas!",
      });
    } else if (!value) {
      if (Number.isInteger(value)) {
        setErrors({
          value: "Insira um número!",
        });
      } else {
        setErrors({
          value: "Insira um valor!",
        });
      }
    } else if (!condition) {
      setErrors({
        condition: "Insira a condição da parcela!",
      });
    } else if (paymentList[0] === undefined) {
      setErrors({
        date: "Insira a entrada!",
      });
    } else {
      setErrors({});

      let initialDate = paymentList.slice(-1)[0].date;
      for (let i = 0; i < num; i++) {
        initialDate = addDays(initialDate, inter);

        addPayment(initialDate, parseFloat(value), condition);
      }
    }
  };

  function dataAtualFormatada(input) {
    var data = new Date(input);
    data.setDate(data.getDate() + 1);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return data.toLocaleDateString("pt-BR", options);
  }

  function addDays(input, days) {
    var data = new Date(input);
    data.setDate(data.getDate() + parseFloat(days));
    return data;
  }

  const handleSubmit = (e) => {
    if (paymentList.length > 0) {
      history.push(`/freightdetails`);
    } else {
      message.error("Insira pelo menos um produto!");
    }
  };

  function BackButton() {
    if (values !== undefined) {
      if (values.tipo_contrato === "Pedido Padrão") {
        return (
          <Link to="/orderoptions">
            <Button variant="contained" style={{ margin: 15 }}>
              Voltar
            </Button>
          </Link>
        );
      }
    }
    return (
      <Link to="/orderdetails">
        <Button variant="contained" style={{ margin: 15 }}>
          Voltar
        </Button>
      </Link>
    );
  }

  return (
    <div>
      <Menu title="Detalhes do Pagamento" />

      <Container maxWidth="md" component="main" align="center">
        <Container>
          <section>
            <form onSubmit={handleAddEntrada} autoComplete="off">
              <TextField
                label="Data"
                margin="normal"
                fullWidth
                className={classes.form}
                onChange={(e) => setdateEntrada(e.target.value)}
                InputLabelProps={{ shrink: true }}
                type="date"
              />
              <TextField
                label="Valor da entrada"
                margin="normal"
                fullWidth
                className={classes.form}
                onChange={(e) => setValueEntrada(e.target.value)}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              <FormControl fullWidth className={classes.form}>
                <InputLabel>Condição da parcela</InputLabel>
                <NativeSelect
                  required
                  onChange={(e) => setConditionEntrada(e.target.value)}
                >
                  <option value="" />
                  {payments.map((option) => (
                    <option key={option.label}>{option.label}</option>
                  ))}
                </NativeSelect>
              </FormControl>

              <Typography variant="overline" display="block" gutterBottom>
                {errorsEntrada.date}
                {errorsEntrada.value}
                {errorsEntrada.condition}
              </Typography>

              <Button
                type="button"
                variant="outlined"
                onClick={handleAddEntrada}
              >
                Adicionar Entrada
              </Button>
            </form>
            <form
              onSubmit={handleAdd}
              style={{ marginBottom: 30 }}
              autoComplete="off"
            >
              <TextField
                label="Numero de Parcelas"
                margin="normal"
                fullWidth
                className={classes.form}
                onChange={(e) => setNum(e.target.value)}
                type="number"
              />
              <TextField
                label="Intervalo das Parcelas(dias)"
                margin="normal"
                fullWidth
                className={classes.form}
                onChange={(e) => setInter(e.target.value)}
                type="number"
              />
              <TextField
                label="Valor de cada parcela"
                margin="normal"
                fullWidth
                className={classes.form}
                onChange={(e) => setValue(e.target.value)}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              <FormControl fullWidth className={classes.form}>
                <InputLabel>Condição das parcelas</InputLabel>
                <NativeSelect
                  required
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="" />
                  {payments.map((option) => (
                    <option key={option.label}>{option.label}</option>
                  ))}
                </NativeSelect>
              </FormControl>

              <Typography variant="overline" display="block" gutterBottom>
                {errors.num}
                {errors.inter}
                {errors.value}
                {errors.condition}
                {errors.date}
              </Typography>

              <Button type="button" variant="outlined" onClick={handleAdd}>
                Calcular Parcelas
              </Button>
            </form>
            <Container align="left">
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow key={Math.random()}>
                      <TableCell align="center">Parcela</TableCell>
                      <TableCell align="center">Data</TableCell>
                      <TableCell align="center">Valor</TableCell>
                      <TableCell align="center">Tipo de Pagamento</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentList.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell align="center">
                          {paymentList.indexOf(payment) + 1}
                        </TableCell>
                        <TableCell align="center">
                          {dataAtualFormatada(payment.date)}
                        </TableCell>
                        <TableCell align="center">
                          {payment.value.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell align="center">
                          {payment.condition}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="delete"
                            onClick={() => removePayment(payment.id)}
                          >
                            <DeleteOutlineIcon />
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
        <BackButton />
        <Button
          variant="contained"
          color="secondary"
          onClick={resetPayment}
          style={{ margin: 15 }}
          disabled={submitting}
        >
          Limpar Pagamentos
        </Button>
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
};

const mapStateToProps = (state) => ({
  values: getFormValues("infoReduxForm")(state),
  paymentList: state.paymentList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(PaymentActions, dispatch);

PaymentDetails = connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false,
})(PaymentDetails);
