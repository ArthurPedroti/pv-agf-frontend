import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";

import { bindActionCreators } from "redux";
import { Creators as OrderActions } from "../../store/ducks/orderList";
import { Creators as SelectActions } from "../../store/ducks/select_infos";
import { Creators as ProductActions } from "../../store/ducks/productList";
import { Creators as PaymentActions } from "../../store/ducks/paymentList";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import PublishIcon from "@material-ui/icons/Publish";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Menu from "../../components/Menu";

var OrderDetails = ({
  values,
  addOrder,
  cliente,
  produtos,
  parcelas,
  orderList,
  removeOrder,
  loadProducts,
  loadPayments,
  toggleClient,
  initialize,
}) => {
  const [value, setValue] = useState("");
  const [errors, setErrors] = useState({});

  const loadOrder = (cliente, values, produtos, parcelas) => {
    toggleClient(cliente);
    initialize(values);
    loadProducts(produtos);
    loadPayments(parcelas);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!value) {
      setErrors({
        name: "Insira o nome do pedido!",
      });
    } else {
      setErrors({});
      addOrder(value, cliente, values, produtos, parcelas);
    }
  };

  return (
    <div>
      <Menu title="Detalhes do Pagamento" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleAdd}>
          <TextField
            label="Nome do pedido"
            margin="normal"
            fullWidth
            onChange={(e) => setValue(e.target.value)}
          />
          <Typography variant="overline" display="block" gutterBottom>
            {errors.name}
          </Typography>
          <Button
            type="button"
            style={{ marginBottom: 30 }}
            variant="outlined"
            onClick={handleAdd}
          >
            Salvar pedido atual
          </Button>
        </form>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow key={Math.random()}>
                <TableCell align="center">Índice</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Valor</TableCell>
                <TableCell align="center">Tipo de Pagamento</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList.map((order) => (
                <TableRow key={order.id}>
                  <TableCell align="center">
                    {orderList.indexOf(order) + 1}
                  </TableCell>
                  <TableCell align="center">{order.name}</TableCell>
                  <TableCell align="center">
                    {order.cliente.codigo_cliente}
                  </TableCell>
                  <TableCell align="center">
                    {order.cliente.codigo_cliente}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="load"
                      onClick={() =>
                        loadOrder(
                          order.cliente,
                          order.values,
                          order.produtos,
                          order.parcelas
                        )
                      }
                    >
                      <PublishIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => removeOrder(order.id)}
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  values: getFormValues("infoReduxForm")(state),
  orderList: state.orderList,
  cliente: state.select_infos.cliente,
  produtos: state.productList,
  parcelas: state.paymentList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { ...OrderActions, ...SelectActions, ...ProductActions, ...PaymentActions },
    dispatch
  );

OrderDetails = connect(mapStateToProps, mapDispatchToProps)(OrderDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false,
  enableReinitialize: true,
})(OrderDetails);
