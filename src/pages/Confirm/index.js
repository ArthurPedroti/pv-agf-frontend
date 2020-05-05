import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TableHead from "@material-ui/core/TableHead";

import Menu from "../../components/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
    textAlign: "right",
  },
}));

var Confirm = ({
  values,
  cliente,
  produtos,
  parcelas,
  history,
  handleSubmit,
  submitting,
}) => {
  const classes = useStyles();

  async function showResults() {
    history.push(`/success`);
  }

  function ExtraToolOptions() {
    if (values.pont_extra) {
      return (
        <>
          <strong>Ponteira extra: </strong>
          Sim <br />
          <strong>Quantidade extra: </strong>
          {values.qtd_extra} <br />
          <strong>Tipo extra: </strong>
          {values.tipo_extra} <br />
        </>
      );
    }
    return null;
  }

  function Contrato() {
    if (values.num_contrato) {
      return (
        <>
          <strong>Contrato: </strong>
          Sim <br />
          <strong>Nº do Contrato: </strong>
          {values.num_contrato}
          <br />
        </>
      );
    }
    return null;
  }

  function InfoAdPro() {
    if (values.info_ad_produtos) {
      return (
        <caption>
          <strong>Informações adicionais: </strong>
          {values.info_ad_produtos} <br />
        </caption>
      );
    }
    return null;
  }

  function InfoAdPag() {
    if (values.info_ad_pagamento) {
      return (
        <caption>
          <strong>Informações adicionais: </strong>
          {values.info_ad_pagamento} <br />
        </caption>
      );
    }
    return null;
  }

  function dataAtualFormatada(input) {
    var data = new Date(input);
    data.setDate(data.getDate() + 1);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return data.toLocaleDateString("pt-BR", options);
  }

  return (
    <div>
      <Menu title="Confirme as informações" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <ExpansionPanel key={"Vendedor"}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Informações do Vendedor
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>
                  <strong>Vendedor: </strong>
                  {values.vendedor}
                  <br />
                  <strong>Natureza da Operação: </strong>
                  {values.natureza_operacao}
                </p>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel key={"Cliente"}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Informações do Cliente
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>
                  <strong>Código do cliente: </strong>
                  {cliente.codigo_cliente} <br />
                  <strong>Razão Social: </strong>
                  {cliente.razao_social} <br />
                  <strong>CNPJ: </strong>
                  {cliente.cnpj} <br />
                  <strong>Inscrição Estadual: </strong>
                  {cliente.inscricao_estadual} <br />
                  <strong>Endereço: </strong>
                  {cliente.endereco} <br />
                  <strong>Bairro: </strong>
                  {cliente.bairro} <br />
                  <strong>Município: </strong>
                  {cliente.municipio} <br />
                  <strong>UF: </strong>
                  {cliente.uf} <br />
                  <strong>CEP: </strong>
                  {cliente.cep} <br />
                  <strong>Telefone: </strong>
                  {cliente.telefone} <br />
                  <strong>Celular: </strong>
                  {cliente.celular} <br />
                  <strong>Cargo do contato: </strong>
                  {values.cargo_contato} <br />
                  <strong>Nome do contato: </strong>
                  {values.nome_contato} <br />
                  <strong>Email do contato: </strong>
                  {values.email_contato}
                </p>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel key={"Produtos"}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Informações dos Produtos
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TableContainer component={Paper}>
                  <Table aria-label="caption table">
                    <InfoAdPro />
                    <TableHead>
                      <TableRow>
                        <TableCell>Produto</TableCell>
                        <TableCell align="center">Preço</TableCell>
                        <TableCell align="center">Quantidade</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {produtos.map((product) => (
                        <TableRow key={product.product.descricao}>
                          <TableCell component="th" scope="row">
                            {product.product.descricao}
                          </TableCell>
                          <TableCell align="center">
                            {product.value.toLocaleString("pt-br", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </TableCell>
                          <TableCell align="center">{product.qtd}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel key={"Pedido"}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Tipo de Pedido
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>
                  <strong>Tipo de Pedido: </strong>
                  {values.tipo_contrato}
                </p>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {values.tipo_contrato === "Pedido para Kits Hidráulicos" ? (
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>
                    Informações do Kit Hidráulico
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <p>
                    <strong>Kit: </strong>
                    {values.kit} <br />
                    <strong>Máquina: </strong>
                    {values.maquina} <br />
                    <strong>Modelo: </strong>
                    {values.modelo} <br />
                    <strong>Ano: </strong>
                    {values.ano} <br />
                    <strong>Engate: </strong>
                    {values.engate} <br />
                    <strong>Informações relevantes: </strong>
                    {values.informacoes_relevantes} <br />
                    <strong>Condição: </strong>
                    {values.condicao} <br />
                    <strong>Tipo de ponteira: </strong>
                    {values.tipo_ponteira} <br />
                    <ExtraToolOptions />
                    <strong>Informações adicionais: </strong>
                    {values.info_ad_hidraulico} <br />
                  </p>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ) : null}
            {values.tipo_contrato === "Pedido para Monofio" ? (
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>
                    Informações do Monofio
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <p>
                    <strong>Acompanha kit de instalação (CE25P10001)?: </strong>
                    {values.kit_instalacao} <br />
                    <strong>Comprimento do circuito: </strong>
                    {values.comprimento_circuito}
                  </p>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ) : null}

            <ExpansionPanel key={"Pagamento"}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Informações do Pagamento
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TableContainer component={Paper}>
                  <Table aria-label="caption table">
                    <InfoAdPag />
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Parcela</TableCell>
                        <TableCell align="center">Data</TableCell>
                        <TableCell align="center">Valor</TableCell>
                        <TableCell align="center">Tipo de Pagamento</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {parcelas.map((payment) => (
                        <TableRow key={parcelas.indexOf(payment) + 1}>
                          <TableCell align="center">
                            {parcelas.indexOf(payment) + 1}
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel key={"Frete"}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Informações do Frete
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>
                  <strong>Responsável: </strong>
                  {values.frete}
                </p>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel key={"Outros"}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Outras Informações
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <p>
                  <Contrato />
                  <strong>Nº do Pedido: </strong>
                  {values.num_pedido} <br />
                  <strong>Nº da NF: </strong>
                  {values.num_nf} <br />
                  <strong>Nº do pedido de compra: </strong>
                  {values.num_pc} <br />
                  <strong>Data do pedido de compra: </strong>
                  {values.data_pc} <br />
                  <strong>Nº de Serie: </strong>
                  {values.ns}
                </p>
              </ExpansionPanelDetails>
            </ExpansionPanel>
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
};

const mapStateToProps = (state) => ({
  values: getFormValues("infoReduxForm")(state),
  cliente: state.select_infos.cliente,
  produtos: state.productList,
  parcelas: state.paymentList,
});

Confirm = connect(mapStateToProps)(Confirm);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false,
})(Confirm);
