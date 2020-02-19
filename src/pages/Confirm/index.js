import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { bindActionCreators } from "redux";
import { Creators as SelectActions } from "../../store/ducks/select_infos";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Menu from "../../components/Menu";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline",
    textAlign: "right"
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 16
  }
}))(TableCell);

class TableData extends Component {
  render() {
    return (
      <TableRow>
        <StyledTableCell>{this.props.title}</StyledTableCell>
        <StyledTableCell size="medium" align="right">
          {this.props.data}
        </StyledTableCell>
      </TableRow>
    );
  }
}

function Confirm({
  values,
  vendedor,
  naturezaOperacao,
  cliente,
  produtos,
  parcelas,
  history,
  handleSubmit,
  submitting
}) {
  const classes = useStyles();

  async function showResults() {
    history.push(`/success`);
  }

  return (
    <div>
      <Menu title="Confirme as informações" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  <TableData title="Vendedor" data={vendedor.name} />
                  <TableData
                    title="Natureza da Operação"
                    data={naturezaOperacao.name}
                  />
                  <TableData
                    title="Código do cliente"
                    data={cliente.codigo_cliente}
                  />
                  <TableData title="Razão Social" data={cliente.razao_social} />
                  <TableData title="CNPJ" data={cliente.cnpj} />
                  <TableData
                    title="Inscrição Estadual"
                    data={cliente.inscricao_estadual}
                  />
                  <TableData title="Endereço" data={cliente.endereco} />
                  <TableData title="Bairro" data={cliente.bairro} />
                  <TableData title="Município" data={cliente.municipio} />
                  <TableData title="UF" data={cliente.uf} />
                  <TableData title="CEP" data={cliente.cep} />
                  <TableData title="Telefone" data={cliente.telefone} />
                  <TableData title="Celular" data={cliente.celular} />
                  <TableData
                    title="Cargo do contato"
                    data={values.cargo_contato}
                  />
                  <TableData
                    title="Nome do contato"
                    data={values.nome_contato}
                  />
                  <TableData
                    title="Email do contato"
                    data={values.email_contato}
                  />
                  <TableData title="Produtos:" />
                  {produtos.map(produto => (
                    <TableData
                      title={produto.product.codigo}
                      data={produto.value}
                    />
                  ))}
                  <TableData
                    title="Tipo de Contrato"
                    data={values.tipo_contrato}
                  />
                  <TableData title="Kit" data={values.kit} />
                  <TableData title="Máquina" data={values.maquina} />
                  <TableData title="Modelo" data={values.modelo} />
                  <TableData title="Ano" data={values.ano} />
                  <TableData title="Engate" data={values.engate} />
                  <TableData
                    title="Informações relevantes"
                    data={values.informacoes_relevantes}
                  />
                  <TableData title="Pagamento" />
                  {parcelas.map(parcela => (
                    <TableData title={parcela.date} data={parcela.value} />
                  ))}

                  <TableData title="Frete" data={values.frete} />
                  <TableData title="Contrato" data={values.contrato} />
                  <TableData
                    title="Nº do Contrato"
                    data={values.num_contrato}
                  />
                  <TableData title="Nº do Pedido" data={values.num_pedido} />
                  <TableData title="Nº da NF" data={values.num_nf} />
                  <TableData
                    title="Nº do pedido de compra"
                    data={values.num_pc}
                  />
                  <TableData
                    title="Data do pedido de compra"
                    data={values.data_pc}
                  />
                  <TableData title="NS" data={values.ns} />
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
          <Link to="/otherdetails">
            <Button variant="contained" style={{ margin: 15 }}>
              Voltar
            </Button>
          </Link>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: 15 }}
            disabled={submitting}
          >
            Confirmar
          </Button>
        </form>
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  values: getFormValues("infoReduxForm")(state),
  vendedor: state.select_infos.vendedor,
  naturezaOperacao: state.select_infos.naturezaOperacao,
  cliente: state.select_infos.cliente,
  produtos: state.productList,
  parcelas: state.paymentList
});

Confirm = connect(mapStateToProps, mapDispatchToProps)(Confirm);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(Confirm);
