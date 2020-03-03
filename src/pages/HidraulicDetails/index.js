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
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import Menu from "../../components/Menu";

const renderInputNotReq = ({ input, label, placeholder }) => (
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

const renderSelectNoReq = ({ input, label, options }) => (
  <div>
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <NativeSelect native {...input}>
        <option value="" />
        {options.map(option => (
          <option value={option.label}>{option.label}</option>
        ))}
      </NativeSelect>
    </FormControl>
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

const renderSwitch = ({ input, checked, options }) => (
  <div>
    <FormControlLabel
      control={
        <Switch
          {...input}
          checked={checked}
          onChange={options}
          value="checked"
          color="primary"
        />
      }
      labelPlacement="start"
      label="Ponteiro Extra ?"
    />
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

const conditions = [
  { label: "Sem condição" },
  {
    label:
      "Condição Padrão: Uma Caixa Ferramenta Completa com Kit Nitrogênio, Um Cilindro de Gás, Um Par de Mangueiras, Um Manual de Peças, Um Manual de Operação e Uma Ponteira."
  }
];

const tool_types = [
  { label: "Cego" },
  { label: "Universal" },
  { label: "Cunha H" },
  { label: "Cunha V" },
  { label: "Lapis" },
  { label: "Pata de Elefante" },
  { label: "Ponteiro Universal Longo" }
];

function HidraulicDetails({ history, handleSubmit, submitting }) {
  const [state, setState] = React.useState({
    checked: true
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  function ExtraToolOptions() {
    if (state.checked) {
      return (
        <>
          <Field
            name="qtd_extra"
            label="Quantidade:"
            type="number"
            component={renderInput}
          />
          <Field
            name="tipo_extra"
            label="Tipo de ponteira:"
            options={tool_types}
            type="text"
            component={renderSelect}
          />
          <Field
            name="info_ad_hidraulico"
            label="Informações adicionais:"
            type="text"
            component={renderInput}
          />
        </>
      );
    }
    return null;
  }

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
            <Field
              name="condicao"
              label="Condição:"
              options={conditions}
              type="text"
              component={renderSelect}
            />
            <Field
              name="tipo_ponteira"
              label="Tipo de ponteira:"
              options={tool_types}
              type="text"
              component={renderSelect}
            />
            <Field
              name="pont_extra"
              label="Ponteira extra:"
              checked={state.checked}
              options={handleChange("checked")}
              type="text"
              component={renderSwitch}
            />
            <ExtraToolOptions />
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
  destroyOnUnmount: false
})(HidraulicDetails);
