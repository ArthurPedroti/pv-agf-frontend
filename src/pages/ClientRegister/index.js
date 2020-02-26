import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import { bindActionCreators } from "redux";
import { Creators as ClientAction } from "../../store/ducks/clientList";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import Menu from "../../components/Menu";

function ClientRegister({ addClient, handleSubmit, submitting, history }) {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [inscricaoEstadual, setInscricaoEstadual] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [uf, setUf] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [errors, setErrors] = useState({});

  async function handleSubmit() {
    await addClient(
      razaoSocial,
      cnpj,
      inscricaoEstadual,
      endereco,
      bairro,
      municipio,
      uf,
      cep,
      telefone,
      celular
    );

    history.push(`/clientdetails`);
  }

  return (
    <div>
      <Menu title="Cadastro de Clientes" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit}>
          <Container>
            <TextField
              required
              label="Razão Social"
              margin="normal"
              fullWidth
              onChange={e => setRazaoSocial(e.target.value)}
            />
            <TextField
              required
              label="CNPJ"
              margin="normal"
              fullWidth
              onChange={e => setCnpj(e.target.value)}
            />
            <TextField
              required
              label="Inscrição Estadual"
              margin="normal"
              fullWidth
              onChange={e => setInscricaoEstadual(e.target.value)}
            />
            <TextField
              required
              label="Endereço"
              margin="normal"
              fullWidth
              onChange={e => setEndereco(e.target.value)}
            />
            <TextField
              required
              label="Bairro"
              margin="normal"
              fullWidth
              onChange={e => setBairro(e.target.value)}
            />
            <TextField
              required
              label="Município"
              margin="normal"
              fullWidth
              onChange={e => setMunicipio(e.target.value)}
            />
            <TextField
              required
              label="UF"
              margin="normal"
              fullWidth
              onChange={e => setUf(e.target.value)}
            />
            <TextField
              required
              label="CEP"
              margin="normal"
              fullWidth
              onChange={e => setCep(e.target.value)}
            />
            <TextField
              required
              label="Telefone"
              margin="normal"
              fullWidth
              onChange={e => setTelefone(e.target.value)}
            />
            <TextField
              required
              label="Celular"
              margin="normal"
              fullWidth
              onChange={e => setCelular(e.target.value)}
            />
            <Typography variant="overline" display="block" gutterBottom>
              {errors.product}
              {errors.value}
            </Typography>
          </Container>

          <Link to="/clientdetails">
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
            Cadastrar
          </Button>
        </form>
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({
  productsSelect: state.bd_selects.products,
  productList: state.productList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ClientAction, dispatch);

ClientRegister = connect(mapStateToProps, mapDispatchToProps)(ClientRegister);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false
})(ClientRegister);
