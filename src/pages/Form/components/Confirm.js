import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import { List, ListItem } from "material-ui";

export default class Confirm extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const {
      values: {
        vendedor,
        naturezaOperacao,
        codigoCliente,
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
        codigo1,
        codigo2,
        codigo3,
        codigo4,
        codigo5,
        codigo6,
        codigo7,
        produto1,
        produto2,
        produto3,
        produto4,
        produto5,
        produto6,
        produto7,
        preco1,
        preco2,
        preco3,
        preco4,
        preco5,
        preco6,
        preco7,
        kit,
        tipoKit,
        maquina,
        modelo,
        ano,
        engate,
        infoRelevantes,
        condicao,
        tipoPonteira,
        pontExtra,
        qtdExtra,
        tipoExtra,
        infoAdiPont,
        valorEntrada,
        dataEntrada,
        formaPagEntrada,
        numParcelas,
        valorParcelas,
        vencParcelas,
        formaPagParcelas,
        prevEntrega,
        frete,
        prevInstalacao,
        contrato,
        numContrato,
        numPedido,
        numNF,
        dataPV,
        nsPV
      }
    } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Confirmar" />
          <List>
            <ListItem primaryText="Vendedor" secondaryText={vendedor} />
            <ListItem
              primaryText="Natureza da Operação"
              secondaryText={naturezaOperacao}
            />
            <ListItem
              primaryText="Código Cliente"
              secondaryText={codigoCliente}
            />
            <ListItem primaryText="CNPJ" secondaryText={cnpj} />
            <ListItem
              primaryText="Inscrição Estadual"
              secondaryText={inscricaoEstadual}
            />
            <ListItem primaryText="Endereço" secondaryText={endereco} />
            <ListItem primaryText="Bairro" secondaryText={bairro} />
            <ListItem primaryText="Município" secondaryText={municipio} />
            <ListItem primaryText="UF" secondaryText={uf} />
            <ListItem primaryText="CEP" secondaryText={cep} />
            <ListItem primaryText="Telefone" secondaryText={telefone} />
            <ListItem primaryText="Celular" secondaryText={celular} />
            <ListItem
              primaryText="Nome do Contato"
              secondaryText={nomeContato}
            />
            <ListItem
              primaryText="Cargo do Contato"
              secondaryText={cargoContato}
            />
            <ListItem
              primaryText="Email do Contato"
              secondaryText={emailContato}
            />
            <ListItem
              primaryText="Código do Produto 1"
              secondaryText={codigo1}
            />
            <ListItem
              primaryText="Código do Produto 2"
              secondaryText={codigo2}
            />
            <ListItem
              primaryText="Código do Produto 3"
              secondaryText={codigo3}
            />
            <ListItem
              primaryText="Código do Produto 4"
              secondaryText={codigo4}
            />
            <ListItem
              primaryText="Código do Produto 5"
              secondaryText={codigo5}
            />
            <ListItem
              primaryText="Código do Produto 6"
              secondaryText={codigo6}
            />
            <ListItem
              primaryText="Código do Produto 7"
              secondaryText={codigo7}
            />
            <ListItem
              primaryText="Descrição do Produto 1"
              secondaryText={produto1}
            />
            <ListItem
              primaryText="Descrição do Produto 2"
              secondaryText={produto2}
            />
            <ListItem
              primaryText="Descrição do Produto 3"
              secondaryText={produto3}
            />
            <ListItem
              primaryText="Descrição do Produto 4"
              secondaryText={produto4}
            />
            <ListItem
              primaryText="Descrição do Produto 5"
              secondaryText={produto5}
            />
            <ListItem
              primaryText="Descrição do Produto 6"
              secondaryText={produto6}
            />
            <ListItem
              primaryText="Descrição do Produto 7"
              secondaryText={produto7}
            />
            <ListItem primaryText="Preço do Produto 1" secondaryText={preco1} />
            <ListItem primaryText="Preço do Produto 2" secondaryText={preco2} />
            <ListItem primaryText="Preço do Produto 3" secondaryText={preco3} />
            <ListItem primaryText="Preço do Produto 4" secondaryText={preco4} />
            <ListItem primaryText="Preço do Produto 5" secondaryText={preco5} />
            <ListItem primaryText="Preço do Produto 6" secondaryText={preco6} />
            <ListItem primaryText="Preço do Produto 7" secondaryText={preco7} />
            <ListItem primaryText="Kit" secondaryText={kit} />
            <ListItem primaryText="Tipo do Kit" secondaryText={tipoKit} />
            <ListItem primaryText="Máquina" secondaryText={maquina} />
            <ListItem primaryText="Modelo" secondaryText={modelo} />
            <ListItem primaryText="Ano" secondaryText={ano} />
            <ListItem primaryText="Engate" secondaryText={engate} />
            <ListItem
              primaryText="Informações Relevantes"
              secondaryText={infoRelevantes}
            />
            <ListItem primaryText="Condição" secondaryText={condicao} />
            <ListItem
              primaryText="Tipo de ponteira"
              secondaryText={tipoPonteira}
            />
            <ListItem primaryText="Ponteira Extra" secondaryText={pontExtra} />
            <ListItem
              primaryText="Quantidade de ponteiras extras"
              secondaryText={qtdExtra}
            />
            <ListItem
              primaryText="Tipo de ponteira extra"
              secondaryText={tipoExtra}
            />
            <ListItem
              primaryText="Informações adicionais"
              secondaryText={infoAdiPont}
            />
            <ListItem
              primaryText="Valor da entrada"
              secondaryText={valorEntrada}
            />
            <ListItem
              primaryText="Data da entrada"
              secondaryText={dataEntrada}
            />
            <ListItem
              primaryText="Forma de pagamento da entrada"
              secondaryText={formaPagEntrada}
            />
            <ListItem
              primaryText="Número de parcelas"
              secondaryText={numParcelas}
            />
            <ListItem
              primaryText="Valor das parcelas"
              secondaryText={valorParcelas}
            />
            <ListItem
              primaryText="Vencimento das parcelas"
              secondaryText={vencParcelas}
            />
            <ListItem
              primaryText="Forma de pagamento das parcelas"
              secondaryText={formaPagParcelas}
            />
            <ListItem
              primaryText="Previsão de entrega"
              secondaryText={prevEntrega}
            />
            <ListItem primaryText="Frete" secondaryText={frete} />
            <ListItem
              primaryText="Previsão de Instalação"
              secondaryText={prevInstalacao}
            />
            <ListItem primaryText="Contrato" secondaryText={contrato} />
            <ListItem
              primaryText="Número do Contrato"
              secondaryText={numContrato}
            />
            <ListItem
              primaryText="Número do Pedido"
              secondaryText={numPedido}
            />
            <ListItem primaryText="Número da NF" secondaryText={numNF} />
            <ListItem primaryText="Data do pedido" secondaryText={dataPV} />
            <ListItem
              primaryText="Número de série do pedido"
              secondaryText={nsPV}
            />
          </List>
          <br />
          <RaisedButton
            label="Confirm & Continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
          <RaisedButton
            label="Back"
            primary={false}
            style={styles.button}
            onClick={this.back}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};
