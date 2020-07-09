import React, { useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts';
import Button from '@material-ui/core/Button';
// modal imports
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  offset: theme.mixins.toolbar,
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function PdfMakeKit({
  cliente, values, produtos, parcelas,
}) {
  function dataAtualFormatada(input) {
    const data = new Date(input);
    data.setDate(data.getDate() + 1);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return data.toLocaleDateString('pt-BR', options);
  }

  const productsFormat = (produtoParams) => produtoParams.map((produto) => [
    { text: produto.product.codigo, style: 'centerLine' },
    { text: produto.product.descricao, style: 'centerLine' },
    { text: produto.product.desc_grupo, style: 'centerLine' },
    { text: produto.qtd, style: 'centerLine' },
    {
      text: produto.value.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }),
      style: 'centerLine',
    },
    {
      text: (produto.value * produto.qtd).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }),
      style: 'centerLine',
    },
  ]);

  let paymentsFormat = (parcelasParams) => {
    const arr1 = [
      [
        {
          text: 'FINANCEIRO',
          alignment: 'center',
          bold: true,
          colSpan: 4,
          fontSize: 9,
          fillColor: '#dddddd',
        },
        {},
        {},
        {},
      ],
      [
        { text: 'PARCELA', style: 'centerHeader' },
        { text: 'DATA', style: 'centerHeader' },
        { text: 'FORMA DE PAGTO', style: 'centerHeader' },
        { text: 'VALOR', style: 'centerHeader' },
      ],
    ];
    const arr2 = parcelasParams.map((parcela) => [
      { text: parcelasParams.indexOf(parcela) + 1, style: 'centerLine' },
      { text: dataAtualFormatada(parcela.date), style: 'centerLine' },
      { text: parcela.condition, style: 'centerLine' },
      {
        text: parcela.value.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
        style: 'centerLine',
      },
    ]);
    return [...arr1, ...arr2];
  };

  const pontExtraFormat = () => {
    if (values.pont_extra) {
      return [
        { text: 'PONTEIRA EXTRA: ', bold: true },
        'SIM',
        '\n',
        { text: 'QUANTIDADE: ', bold: true },
        values.qtd_extra,
        '\n',
        { text: 'TIPO: ', bold: true },
        values.tipo_extra,
        '\n',
      ];
    }
    return [];
  };

  const infoAdd = (input) => {
    if (input) {
      return [
        {
          text: 'Informações adicionais:',
          marginTop: 2,
          style: 'header',
          fontSize: 9,
        },
        {
          table: {
            widths: '*',
            body: [
              [
                {
                  text: input,
                },
              ],
            ],
          },
        },
      ];
    }

    return [];
  };

  const mapProducts = produtos.map((produto) => produto.value * produto.qtd);
  const sumProducts = mapProducts.length > 0 ? mapProducts.reduce((a, b) => a + b) : 0;
  const mapPayments = parcelas.map((parcela) => parcela.value);
  let sumPayments = mapPayments.length > 0 ? mapPayments.reduce((a, b) => a + b) : 0;

  const infoAdd01 = infoAdd(values.info_ad_produtos);
  const infoAdd02 = infoAdd(values.info_ad_hidraulico);
  const infoAdd03 = values.payment_type ? infoAdd(values.info_ad_pagamento) : '';

  const paymentType = (input) => {
    if (input) {
      return;
    }
    paymentsFormat = () => [
      [
        {
          text: 'FINANCEIRO',
          alignment: 'center',
          bold: true,
          colSpan: 4,
          fontSize: 9,
          fillColor: '#dddddd',
        },
        {},
        {},
        {},
      ],
      [
        {
          text: [values.entrada ? `Entrada de ${values.entrada.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}` : 'Sem entrada', values.valor_parcelas && ` / ${values.num_parcelas}x parcelas de ${values.valor_parcelas.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })} `, values.parcelas_type === 'ddl' ? '(DDL) ' : null, `a cada ${values.int_parcelas} dias.`, values.info_ad_pagamentoAuto && `\n${values.info_ad_pagamentoAuto}`],
          colSpan: 4,
        },
        {},
        {},
        {},
      ],
    ];
    if (values.num_parcelas && values.valor_parcelas) {
      sumPayments = values.entrada + (values.num_parcelas * values.valor_parcelas);
    } else {
      sumPayments = values.entrada;
    }
  };

  paymentType(values.payment_type);

  const sumProductsFormated = sumProducts.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  const sumPaymentsFormated = sumPayments.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  const hoje = new Date();
  hoje.setDate(hoje.getDate() - 1);

  const data_pc = values.data_pc !== undefined
    ? values.data_pc
      .slice(-2)
      .concat('/')
      .concat(values.data_pc.slice(5, 7))
      .concat('/')
      .concat(values.data_pc.slice(0, 4))
    : null;

  const engate = values.engate === true ? 'SIM' : 'NÃO';
  const contrato = values.contrato === 'sim' ? 'SIM' : 'NÃO';
  const pontExtraFormated = pontExtraFormat();
  const formattedProducts = productsFormat(produtos);
  const formattedPayments = paymentsFormat(parcelas);

  const { vfs } = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;

  const documentDefinition = {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    content: [
      {
        columns: [
          {
            image: 'logo',
            width: 100,
          },
          {
            width: 'auto',
            text: [
              {
                text:
                  '\nAGF IMPORTAÇÃO, EXPORTAÇÃO E COMERCIALIZAÇÃO DE MÁQUINAS E ACESSÓRIOS LTDA\n',
                bold: true,
              },
              'CNPJ: 11.681.470/0001-84 | INSCRIÇÃO ESTADUAL: 530.051.442.114\n',
              'MATRIZ: Rod. SP 346, km 202,5 - Distrito Industrial, Espirito Santo do Pinhal - SP\n',
              'FILIAL: Rod. Engenheiro Fabiano Vivacqua, 441, Marbrasa, Cachoeiro Itapemirim - ES',
            ],
            fontSize: 6,
          },
          {
            table: {
              widths: [100],
              body: [
                [
                  {
                    text: 'Nº DO PEDIDO',
                    alignment: 'center',
                    bold: true,
                    fontSize: 5,
                    fillColor: '#dddddd',
                  },
                ],
                [
                  {
                    text: values.num_pedido || ' ',
                    alignment: 'center',
                    fontSize: 5,
                  },
                ],
                [
                  {
                    text: 'DATA DO PEDIDO',
                    alignment: 'center',
                    bold: true,
                    fontSize: 5,
                    fillColor: '#dddddd',
                  },
                ],
                [{ text: data_pc || ' ', alignment: 'center', fontSize: 5 }],
              ],
              align: 'center',
            },
          },
        ],
      },
      {
        text: 'PEDIDO DE COMPRA\n',
        fontSize: 14,
        alignment: 'center',
      },
      {
        text: [
          { text: 'VENDEDOR: ', bold: true },
          values.vendedor,
          { text: '\nNATUREZA DE OPERAÇÃO: ', bold: true },
          values.natureza_operacao,
          '\n\n',
        ],
      },
      {
        table: {
          widths: '*',
          body: [
            [
              {
                text: 'DADOS DO CLIENTE',
                alignment: 'center',
                bold: true,
                colSpan: 2,
                fontSize: 9,
                fillColor: '#dddddd',
              },
              {},
            ],
            [
              {
                text: [
                  { text: 'Razão Social: ', bold: true },
                  cliente.razao_social,
                  '\n',
                  { text: 'CNPJ: ', bold: true },
                  cliente.cnpj,
                  '\n',
                  { text: 'Inscrição Estadual: ', bold: true },
                  cliente.inscricao_estadual,
                  '\n',
                  { text: 'Telefone: ', bold: true },
                  cliente.telefone,
                  '\n',
                  { text: 'Nome do contato: ', bold: true },
                  values.nome_contato,
                  '\n',
                  { text: 'Cargo do contato: ', bold: true },
                  values.cargo_contato,
                  '\n',
                  { text: 'Email: ', bold: true },
                  values.email_contato,
                ],
              },
              {
                text: [
                  { text: 'CÓDIGO: ', bold: true },
                  cliente.codigo_cliente,
                  '\n',
                  { text: 'Endereço: ', bold: true },
                  cliente.endereco,
                  '\n',
                  { text: 'Bairro: ', bold: true },
                  cliente.bairro,
                  '\n',
                  { text: 'Município: ', bold: true },
                  cliente.municipio,
                  '\n',
                  { text: 'UF: ', bold: true },
                  cliente.uf,
                  '\n',
                  { text: 'CEP: ', bold: true },
                  cliente.cep,
                  '\n',
                  { text: 'Telefone: ', bold: true },
                  cliente.telefone,
                ],
              },
            ],
          ],
          align: 'center',
        },
      },
      '\n',
      {
        table: {
          widths: [60, '*', 60, 30, 80, 80],
          body: [
            [
              {
                text: 'PRODUTOS',
                alignment: 'center',
                bold: true,
                colSpan: 6,
                fontSize: 9,
                fillColor: '#dddddd',
              },
              {},
              {},
              {},
              {},
              {},
            ],
            [
              { text: 'CÓDIGO', style: 'centerHeader' },
              { text: 'PRODUTO', style: 'centerHeader' },
              { text: 'GRUPO', style: 'centerHeader' },
              { text: 'QTD', style: 'centerHeader' },
              { text: 'PREÇO UNIT', style: 'centerHeader' },
              { text: 'TOTAL', style: 'centerHeader' },
            ],
            ...formattedProducts,
          ],
        },
      },
      {
        text: ['TOTAL: ', sumProductsFormated, '\n'],
        marginTop: 2,
        style: 'header',
        fontSize: 9,
        alignment: 'right',
      },
      ...infoAdd01,
      '\n',
      {
        table: {
          widths: '*',
          body: [
            [
              {
                text: 'KIT HIDRÁULICO',
                alignment: 'center',
                colSpan: 3,
                bold: true,
                fontSize: 9,
                fillColor: '#dddddd',
              },
              {},
              {},
            ],
            [
              {
                text: [
                  values.kit,
                  '\n\n',
                  { text: 'SOBRE A MÁQUINA: ', bold: true },
                  values.maquina,
                  '\n',
                  { text: 'MODELO: ', bold: true },
                  values.modelo,
                  '\n',
                  { text: 'ANO: ', bold: true },
                  values.ano,
                  '\n',
                ],
              },
              {
                text: [
                  { text: 'MÁQUINA POSSUI ENGATE RÁPIDO: ', bold: true },
                  engate,
                  '\n',
                  { text: 'INFORMAÇÕES RELEVANTES: ', bold: true },
                  values.informacoes_relevantes,
                  '\n',
                  { text: 'TIPO DE PONTEIRA: ', bold: true },
                  values.tipo_ponteira,
                  '\n\n',
                  ...pontExtraFormated,
                ],
              },
              {
                text: [
                  {
                    text: 'USO EXCLUSIVO PARA ROMPEDORES HIDRÁULICOS: ',
                    bold: true,
                  },
                  values.condicao,
                  '\n',
                ],
              },
            ],
          ],
          align: 'center',
        },
      },
      ...infoAdd02,
      '\n',
      {
        table: {
          widths: '*',
          body: [...formattedPayments],
        },
      },
      {
        text: ['TOTAL: ', sumPaymentsFormated, '\n'],
        marginTop: 2,
        style: 'header',
        fontSize: 9,
        alignment: 'right',
      },
      ...infoAdd03,
      '\n',
      {
        table: {
          widths: '*',
          body: [
            [
              { text: 'DADOS BANCÁRIOS PARA TED:', style: 'centerHeader' },
              { text: 'FRETE', style: 'centerHeader' },
              { text: 'CONTRATO', style: 'centerHeader' },
            ],
            [
              {
                text: [
                  { text: 'BANCO ITAÚ: 341' },
                  '\n',
                  { text: 'AG: 1619' },
                  '\n',
                  { text: 'C/C: 34963-0' },
                  '\n',
                ],
              },
              {
                text: [
                  { text: 'FRETE: ', bold: true },
                  values.frete,
                  '\n',
                  { text: 'DATA PREVISÃO DE ENTREGA: ', bold: true },
                  'A COMBINAR',
                  '\n',
                  { text: 'DATA PREVISTA DE INSTALAÇÃO: ', bold: true },
                  '3 a 10 dias após a chegada do equipamento',
                  '\n',
                ],
              },
              {
                text: [
                  { text: 'CONTRATO: ', bold: true },
                  contrato,
                  '\n',
                  { text: 'Nº DO CONTRATO: ', bold: true },
                  values.num_contrato,
                  '\n',
                  { text: 'Nº DO PEDIDO: ', bold: true },
                  values.num_pedido,
                  '\n',
                  { text: 'Nº DE NOTA FISCAL: ', bold: true },
                  values.num_nf,
                  '\n',
                  { text: 'Nº DE SÉRIE: ', bold: true },
                  values.ns,
                  '\n',
                ],
              },
            ],
          ],
        },
      },
      '\n\n\n\n\n\n\n\n',
      {
        columns: [
          {
            width: '*',
            text: [
              {
                text: '_________________________________________________',
                bold: true,
              },
              '\n\n',
              { text: cliente.razao_social, bold: true },
              '\n\n',
              { text: 'Data: ______ / ______ / ________', bold: true },
            ],
            alignment: 'center',
            fontSize: 6,
          },
          {
            width: '*',
            text: [
              {
                text: '_________________________________________________',
                bold: true,
              },
              '\n\n',
              { text: 'AGF Equipamentos', bold: true },
              '\n\n',
              { text: 'Data: ______ / ______ / ________', bold: true },
            ],
            alignment: 'center',
            fontSize: 6,
          },
        ],
      },
    ],
    styles: {
      centerHeader: {
        alignment: 'center',
        bold: true,
        fillColor: '#ECECEC',
      },
      centerLine: {
        alignment: 'center',
      },
    },
    defaultStyle: {
      columnGap: 20,
      fontSize: 6,
    },
    images: {
      logo:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA4QAAAGFCAYAAACljT23AAAABGdBTUEAALGeYUxB9wAAACBjSFJNAACHEAAAjBIAAP1NAACBPgAAWesAARIPAAA85gAAGc66ySIyAAABJmlDQ1BBZG9iZSBSR0IgKDE5OTgpAAAoz2NgYDJwdHFyZRJgYMjNKykKcndSiIiMUmA/z8DGwMwABonJxQWOAQE+IHZefl4qAwb4do2BEURf1gWZxUAa4EouKCoB0n+A2CgltTiZgYHRAMjOLi8pAIozzgGyRZKywewNIHZRSJAzkH0EyOZLh7CvgNhJEPYTELsI6Akg+wtIfTqYzcQBNgfClgGxS1IrQPYyOOcXVBZlpmeUKBhaWloqOKbkJ6UqBFcWl6TmFit45iXnFxXkFyWWpKYA1ULcBwaCEIWgENMAarTQZKAyAMUDhPU5EBy+jGJnEGIIkFxaVAZlMjIZE+YjzJgjwcDgv5SBgeUPQsykl4FhgQ4DA/9UhJiaIQODgD4Dw745AMDGT/0ZOjZcAAAACXBIWXMAAC4iAAAuIgGq4t2SAAAG1WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA2LTAzVDEzOjU4OjQ4LTAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA2LTAzVDEzOjU4OjQ4LTAzOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNi0wM1QxMzo1ODo0OC0wMzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2Yjc5Yjg4NC1kNTAyLTE1NGQtOWVlMy1hMzg5YmI0MGY4YzIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiZWYxYzgyOS03ODkyLTM1NGUtODBkZi1kM2UxMjhjMTEzNzUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkYWE1Y2RkMC05YWZiLWFjNDgtYTAzZS1hNDcwZjEwMjEyNzYiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJBZG9iZSBSR0IgKDE5OTgpIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZGFhNWNkZDAtOWFmYi1hYzQ4LWEwM2UtYTQ3MGYxMDIxMjc2IiBzdEV2dDp3aGVuPSIyMDE5LTA2LTAzVDEzOjU4OjQ4LTAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjZiNzliODg0LWQ1MDItMTU0ZC05ZWUzLWEzODliYjQwZjhjMiIgc3RFdnQ6d2hlbj0iMjAxOS0wNi0wM1QxMzo1ODo0OC0wMzowMCIgc3RFdnQ6c29m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eGYmBoTRue222+T66683S0RNx4CQiIgow3hBGgI+7xHVUVevXq2XAY9IQ4DpBXqhkIa2jwjwEPghcMQy2vG1bdtWb4/9AoJDb79E9cG5NG/ePLNE9UHpIEoJieKFASERERERtShkRzEUCKpAU/1wnG688Ua55ZZbTApR0zEgJCIiIqIWhewoqjKjVBrVmSkyVO3eYostpGPHjiaFqOkYEBIREREREWUottomIiIiIiLKUAwIiYiIiIiIMhQDQiIiIiIiogzFgJCIiIiIiChDMSAkIiIiIiLKUAwIiYiIiIiIMhSHnSAiIiIiIkpRtm3L+PHjJTc3V7p27arH9GzTpo3ssMMOZouGMSAkIiIiIiJKMQsWLJD7779fRo8eLQsXLjSpLsuypEuXLnLjjTfKCSecIG3btjVr6mJASERERERElEKeeeYZOffcc/X8brvtJo8++qiUl5fL2rVrpXv37rJ69Wo5++yz5c8//9TbfPjhh3LooYfq+XAMCImIiIiIiFLETTfdJLfeeqvst99+8uabb0q7du3MmrqmT58up5xyikyePFmefPJJOe+888yaGgwIiYiIiIiIUgCqf77xxhvy4osvyqmnnqrTUBoYCAT0BAjviouLpVWrVnoZHnroIbn88svlkUcekYsuusikuhgQEhERERERJbn3339fjjjiCF099MILL9RpV1xxhfz3v//V1UXDjRo1So4//ngpKCjQyyNHjpQnnnhCfvnlFxkwYIBOAw47QURERERElMQqKyt1MHjggQdWB4OwcuVKHQw+/PDDsmTJEt25zEsvvSSdO3eWs846S84//3yzpejAEZ3NDBkyxKS4GBASERERERElsXHjxulHtB0MlZ2drR/RThC9im6++eZ6/vvvv9fp//vf//Sj5+mnn9bB5bRp00wKA0IiIiIiIqKkdtddd+k2geFjC/p8bjj366+/6hLCv/76SzZs2CD/+c9/dPrBBx+sHz2HHXaYfpw1a5Z+BAaERERERERESWzZsmWSl5cnhYWFJsXlLaMqabdu3WSzzTbTgSM6kTn99NPlscce0+s9CBgBpYQeBoRERERERERJrL5+QL2eRW+++WZ55513qksMTz75ZHn++ed1EBkqKytLP4b2QMqAkIiIiIiIKIltvfXWUlZWJuvWrTMpLqTBBRdcIEcddZTMnj1bB4WvvPKKvPbaa3pdqI4dO+rHuXPn6kfgsBMtBId9zZo18tNPP8mCBQt0ES+KfEtLSyU/P18WLVqki3Lxx0dd4bZt21ZH/ERERERE8WTbtixdulTGjx+ve67EYOeYNm7cqEuT0D6tpKRE+vbtq/OmoSVM5JbUTZ06Vefte/ToofPzyOvjWKI6J9Kakpf/7bff9LHH0BMjRowwqSLnnnuuPPPMM/Lzzz/LwIEDddrEiROrh5WYMGGC7LLLLnoe7r33Xrn66qtl5syZen9Qb0CID/Dee+/pYsVEBCLoAhVdpvbu3Vv23HNPk5pe0HgTBx/FuT/88IOO6FetWlWrDm+43Nxcad++vT6pcGzQdew222wj/fr1M1ukLwyy+eGHH+rzDxMuVJiGDRume1FqLvg7ffvtt1JUVFR9Xvbp00f22GMPs0Xy+vzzz2Xx4sW6egCOFc6t4cOH666Hkxl6zpoxY0adag2R4HNttdVW0qFDh+rvDr5LuKnSunVr/Z3xetyiyILBoO5lDIPbtmnTxqRmLpxTuNYceuih4vf7TWrywvWpV69eup1IKsJd6TFjxuhrbKLuSeMasdtuu9XpjCEZ4JqNa+AxxxxjUloWAoJPPvlEcnJy9G8vrrO4KX3IIYck1bV1+fLl8tFHH+n3id/q5oagCNcI/NakE3REMn36dPn0009lypQp+nxEhyReNcRwONb4ncVvMAJC5MkGDx4sO++8s84rZSJ8fzHMA3rzRPu88BI8QKkcCn7OOeccnZfv1KmTWRM9/FbhN2rHHXeUSZMmmVTR+Tx8Z7/77rtaMdR1110nd955pw7q8bfFbwb+rvged+3atbotoYaAMJJffvkFV+mETwcffLB5B+lBnRTOfffd5xxwwAGO+vGL+JkjTeoLFzEdk/oi6uP06KOPOvPmzTOvlH7UyVvns6vA2FEZCbNF8/j3v/9d53XVD6FZm7zUhcLp3bt3nff+5Zdfmi2S1ymnnFLnfTc04TuA75O6uOoJ54W64Dkqk+yoHyVn//33dwYOHKi/e+oi6fz555/mlQi++eYbfRzvuOMOk5LZ1qxZo8+pVPiuqGDeKS4udp599lmTknoef/zxOt/pREzXX3+9eQfJBd9HlUFz7rnnHpPSsrzrQ+ikgiCdn0kmX331VZ332dzT6NGjzauntmXLlulryC677BJT3rShSQWHzr777us8//zzjgrWzSult0WLFjknnXRSnWPRUB4eU1ZWlnP22Wc7K1asMHuK3vvvv6/3EXq9wDX1+OOPd/744w+T4sLvxciRIx0VtDvffvutTjvvvPP086dNm6aXPfUGhNgw9M0najr11FPNO0htc+fOdW655RZnq622ivg54zXl5eU5l19+eVpmeOfMmVPn8yLj/+OPP5otmseoUaPqvO5pp51m1iYvBIR77rlnnff+/fffmy2SF87h8PcdadrURba+CcHixRdf7EydOtW8YubCedK9e3d9XHD9yJQf7oZMmjRJHw/cTEh277zzjn6vt956q0lJPS+++GL1dzOR0/3332/eQXKZPHly9Xt89dVXTWrL+fnnn2sdN0x9+/Z1NmzYYLZIDsgLhL/P5p4+/fRT8+qpCdf72267TQckkT5fvCbcqMUNGNxsS1f43cCNnEifP9qpZ8+ejTqnhg4dqp//1FNPmZTovPTSS/p5V199tUmpkXSN0lCVKZVVVVXJyy+/rItzb7rppuoGm/VVZ2hqdVxUZ3zwwQd19aHXX3895Y9fKHV+JqQaSDQSUW06HlKhulsk0f6dcU5EI3x/qH78yCOP6Opid999t66qnanQxmDhwoV6HtcPtCXIdGiXAWhzgapTyQrn/8iRI/U82oSkqpa6rqO6VTIKva6ddNJJuv1RsknG35aWyO+kah4L7/vxxx/XecUbbrih3uqgnqZ+R1G99vbbb9fNmx5++OGk/e41Fpp97bTTTjrP3xTz5s3TYwTed999JiU6qJp60UUXyXnnnScXX3yxrF271qyJ7M8//9Svc+qpp8r//d//6XxQuEblcpszcxyp3m2qGDt2rM5w4oCj/rUHX6zQCz6WjzzySP1HufLKK3WbQtQFnjNnjm6/ht6B8IPw1ltv6aDylltukd133908uzbvS4sv+4knniiDBg3S+yNKdbjOxPqjhO2RcWkocMT3bvvtt69V/z5TIADEdSIUAkKMbZTJ0AbJc/zxxydtpu/VV1/V7aYAHY+lo+YMPEJ/l5MZfseRn6CGNfYGYSTRnnepcnM41Pfff6/bmF144YUNfgdwnNBRybXXXiv/+Mc/dB4Uv5O///67zpsij4obUS+++KJcccUVOn+KtoMNQSc0l112mRx77LG6jVs6QIc7DfUpgQ5ebrvtNh10oaOX66+/Xh/TSMfKOzevuuoq+fvf/67n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',
    },
  };
  const [errors, setErrors] = useState({});
  let errorCount = 0;

  // modal
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const PdfGenerator = () => {
    if (!values.vendedor || !values.natureza_operacao) {
      setErrors({
        vendedor: 'Preencha todos os dados obrigatórios do vendedor!',
      });
      errorCount += 1;
    }
    if (
      !cliente
      || !values.nome_contato
      || !values.cargo_contato
      || !values.email_contato
    ) {
      setErrors((prevState) => ({
        ...prevState,
        cliente: 'Preencha todos os dados obrigatórios do cliente!',
      }));
      errorCount += 1;
    }
    if (produtos.length <= 0) {
      setErrors((prevState) => ({
        ...prevState,
        produto: 'Preencha os produtos!',
      }));
      errorCount += 1;
    }
    if (!values.tipo_contrato) {
      setErrors((prevState) => ({
        ...prevState,
        contrato: 'Selecione o tipo de contrato!',
      }));
      errorCount += 1;
    }
    if (values.payment_type && parcelas.length <= 0) {
      setErrors((prevState) => ({
        ...prevState,
        produto: 'Preencha os dados de pagamento!',
      }));
      errorCount += 1;
    }
    if (!values.frete) {
      setErrors((prevState) => ({
        ...prevState,
        contrato: 'Selecione o tipo de frete!',
      }));
      errorCount += 1;
    }
    if (sumProducts !== sumPayments) {
      setErrors((prevState) => ({
        ...prevState,
        contrato:
          'O valor total dos produtos não coincide com o valor total das parcelas!',
      }));
      errorCount += 1;
    }

    async function MakePdf() {
      handleOpen();
      await new Promise((resolve) => setTimeout(resolve, 500));
      pdfMake
        .createPdf(documentDefinition)
        .download(`${cliente.razao_social} - ${dataAtualFormatada(hoje)}`);
      handleClose();
    }

    if (errorCount === 0) {
      setErrors({});
      MakePdf();
    }
    errorCount = 0;
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        style={{ margin: 15 }}
        onClick={PdfGenerator}
      >
        Gerar PDF
      </Button>
      {Object.values(errors).map((erro) => (
        <div key={erro}>{erro}</div>
      ))}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>Imprimindo...</h2>
            <div>
              <CircularProgress style={{ margin: 15 }} />
            </div>

            <Button
              type="button"
              onClick={handleClose}
              variant="contained"
              color="primary"
            >
              Cancelar
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
