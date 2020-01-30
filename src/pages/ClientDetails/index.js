import React, { useState } from "react";
import { Link } from "react-router-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Container from "@material-ui/core/Container";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ClientActions from "../../store/actions/toggleClient";

const styles = {
  button: {
    margin: 15
  }
};

function ClientDetails(
  codigoCliente,
  razaoSocial,
  cnpj,
  inscricaoEstadual,
  endereco,
  bairro,
  municipio,
  uf,
  cep,
  telefone,
  celular,
  nomeContato,
  cargoContato,
  emailContato,
  toggleClient
) {
  // const [codigoCliente, setcodigoCliente] = useState("");
  // const [razaoSocial, setrazaoSocial] = useState("");
  // const [cnpj, setcnpj] = useState("");
  // const [inscricaoEstadual, setinscricaoEstadual] = useState("");
  // const [endereco, setendereco] = useState("");
  // const [bairro, setbairro] = useState("");
  // const [municipio, setmunicipio] = useState("");
  // const [uf, setuf] = useState("");
  // const [cep, setcep] = useState("");
  // const [telefone, settelefone] = useState("");
  // const [celular, setcelular] = useState("");
  // const [nomeContato, setnomeContato] = useState("");
  // const [cargoContato, setcargoContato] = useState("");
  // const [emailContato, setemailContato] = useState("");

  return (
    <Container maxWidth="md" component="main" align="center">
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Cliente" />
          <TextField
            hintText="Insira o código do cliente"
            floatingLabelText="Código do cliente"
            onChange={e => setcodigoCliente(e.target.value)}
          />
          <br />
          <TextField
            hintText="Insira a razão social"
            floatingLabelText="Razão social"
            onChange={e => setrazaoSocial(e.target.value)}
          />
          <br />
          <TextField
            hintText="Insira o CNPJ"
            floatingLabelText="CNPJ"
            onChange={e => setcnpj(e.target.value)}
          />
          <br />
          <TextField
            hintText="Insira a inscrição estadual"
            floatingLabelText="Inscrição estadual"
            onChange={e => setinscricaoEstadual(e.target.value)}
          />
          <br />
          <TextField
            hintText="Insira o endereço"
            floatingLabelText="Endereço"
            onChange={e => setendereco(e.target.value)}
          />
          <br />
          <TextField
            hintText="Insira o bairro"
            floatingLabelText="Bairro"
            onChange={e => setbairro(e.target.value)}
          />
          <br />
          <TextField
            hintText="Insira o município"
            floatingLabelText="Município"
            onChange={e => setmunicipio(e.target.value)}
          />
          <br />
          <TextField
            hintText="Insira o UF"
            floatingLabelText="UF"
            onChange={e => setuf(e.target.value)}
          />
          <br />
          <TextField
            hintText="Insira o CEP"
            floatingLabelText="CEP"
            onChange={e => setcep(e.target.value)}
          />
          <br />
          <TextField
            hintText="Insira o telefone"
            floatingLabelText="Telefone"
            onChange={e => settelefone(e.target.value)}
          />
          <br />
          <TextField
            hintText="Insira o celular"
            floatingLabelText="Celular"
            onChange={e => setcelular(e.target.value)}
          />
          <br />
          <TextField
            hintText="Insira o nome do contato"
            floatingLabelText="Nome do contato"
            onChange={e => setnomeContato(e.target.value)}
          />
          <br />
          <TextField
            hintText="Insira o cargo do contato"
            floatingLabelText="Cargo do contato"
            onChange={e => setcargoContato(e.target.value)}
          />
          <br />
          <TextField
            hintText="Insira o email do contato"
            floatingLabelText="Email do contato"
            onChange={e => setemailContato(e.target.value)}
          />
          <br />
          <Link to="/productdetails">
            <RaisedButton
              label="Continue"
              primary={true}
              style={styles.button}
              onClick={() =>
                toggleClient(
                  codigoCliente,
                  razaoSocial,
                  cnpj,
                  inscricaoEstadual,
                  endereco,
                  bairro,
                  municipio,
                  uf,
                  cep,
                  telefone,
                  celular,
                  nomeContato,
                  cargoContato,
                  emailContato
                )
              }
            />
          </Link>
          <Link to="/">
            <RaisedButton label="Back" primary={false} style={styles.button} />
          </Link>
        </React.Fragment>
      </MuiThemeProvider>
    </Container>
  );
}

const mapStateToProps = state => ({
  codigoCliente: state.pedidoInfos.codigoCliente,
  razaoSocial: state.pedidoInfos.razaoSocial,
  cnpj: state.pedidoInfos.cnpj,
  inscricaoEstadual: state.pedidoInfos.inscricaoEstadual,
  endereco: state.pedidoInfos.endereco,
  bairro: state.pedidoInfos.bairro,
  municipio: state.pedidoInfos.municipio,
  uf: state.pedidoInfos.uf,
  cep: state.pedidoInfos.cep,
  telefone: state.pedidoInfos.telefone,
  celular: state.pedidoInfos.celular,
  nomeContato: state.pedidoInfos.nomeContato,
  cargoContato: state.pedidoInfos.cargoContato,
  emailContato: state.pedidoInfos.emailContato
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ClientActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClientDetails);
