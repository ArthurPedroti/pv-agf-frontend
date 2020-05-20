import React from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

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

import Menu from "../../components/Menu";

var orderDetails = ({
  orderList,
  removeOrder,
  loadProducts,
  loadPayments,
  toggleClient,
  initialize,
}) => {
  const loadOrder = (cliente, values, produtos, parcelas) => {
    toggleClient(cliente);
    initialize(values);
    loadProducts(produtos);
    loadPayments(parcelas);
  };

  return (
    <div>
      <Menu title="Detalhes do Pagamento" />

      <Container maxWidth="md" component="main" align="center">
        <Container align="left">
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
                    <TableCell align="center">
                      {order.cliente.codigo_cliente}
                    </TableCell>
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
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orderList: state.orderList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { ...OrderActions, ...SelectActions, ...ProductActions, ...PaymentActions },
    dispatch
  );

orderDetails = connect(mapStateToProps, mapDispatchToProps)(orderDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false,
  enableReinitialize: true,
})(orderDetails);
