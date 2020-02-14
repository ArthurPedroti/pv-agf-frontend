import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import { bindActionCreators } from "redux";
import { Creators as SelectActions } from "../../store/ducks/select_infos";

import TextField from "@material-ui/core/TextField";

import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import Menu from "../../components/Menu";

const validate = values => {
  const errors = {};
  if (!values.nome_contato) {
    errors.nome_contato = "Obrigatório!";
  }
  if (!values.cargo_contato) {
    errors.cargo_contato = "Obrigatório!";
  }
  if (!values.email_contato) {
    errors.email_contato = "Obrigatório!";
  }

  return errors;
};

const renderInput = ({ input, label, placeholder }) => (
  <div>
    <TextField
      {...input}
      required
      label={label}
      placeholder={placeholder}
      fullWidth
      margin="normal"
      size="small"
    />
  </div>
);

const renderSelect = ({ input, label, options }) => (
  <div>
    <FormControl required fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <NativeSelect native required {...input}>
        <option value="" />
        {options.map(option => (
          <option value={option.label}>{option.label}</option>
        ))}
      </NativeSelect>
    </FormControl>
  </div>
);

const kits = [
  { label: "Sem nenhum Kit" },
  { label: "Kit Lubrificação" },
  {
    label:
      "Uma via unidirecional (Ex: Rompedor, Compactador, Vibro Ripper, Serra Rocha, Concha Britadora e etc)"
  },
  {
    label:
      "Uma via bidirecional (Ex: Engate Rápido, Arrasador de Estacas e etc)"
  },
  { label: "Duas vias bidirecional (Ex: Tesoura, Pulverizador e etc)" }
];

const machines = [
  { label: "Mini Escavadeira" },
  { label: "Retro" },
  { label: "Escavadeira" },
  { label: "Outro" }
];

const yesno = [{ label: "Sim" }, { label: "Não" }];

const relevant_infos = [
  { label: "Sem nenhuma informação relevante" },
  { label: "Sem o braço (TAB1 - Fig 1)" },
  { label: "Braço Telescópico (TAB1- Fig 2)" },
  { label: "Kit Original de Fábrica" },
  { label: "Com filtro na linha de retorno" },
  { label: "Sem predisposição no comando (TAB1- Fig 3)" },
  { label: "Na Carregadeira (TAB1 - Fig 4)" }
];

function HidraulicDetails({ history, handleSubmit, submitting }) {
  async function showResults() {
    history.push(`/paymentdetails`);
  }

  return (
    <div>
      <Menu title="Detalhes do Cliente" />

      <Container maxWidth="md" component="main" align="center">
        <form onSubmit={handleSubmit(showResults)}>
          <Container maxWidth="sm" align="left">
            <Field
              name="kit"
              label="Selecione um kit"
              options={kits}
              type="text"
              component={renderSelect}
            />
            <Field
              name="maquina"
              label="Selecione uma máquina"
              options={machines}
              type="text"
              component={renderSelect}
            />
            <Field
              name="modelo"
              label="Modelo"
              type="text"
              component={renderInput}
            />
            <Field name="ano" label="Ano" type="text" component={renderInput} />
            <Field
              name="engate"
              label="Possui engate rápido:"
              options={yesno}
              type="text"
              component={renderSelect}
            />
            <Field
              name="informacoes_relevantes"
              label="Informcações relevantes:"
              options={relevant_infos}
              type="text"
              component={renderSelect}
            />
          </Container>
          <Link to="/contractoptions">
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
            Continuar
          </Button>
        </form>
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(SelectActions, dispatch);

const mapStateToProps = state => ({
  kit: state.select_infos.kit,
  maquina: state.select_infos.maquina
});

HidraulicDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(HidraulicDetails);

export default reduxForm({
  form: "infoReduxForm",
  destroyOnUnmount: false,
  validate
})(HidraulicDetails);
