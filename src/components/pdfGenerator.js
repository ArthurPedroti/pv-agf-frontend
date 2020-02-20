import React, { Component } from "react";
import jsPDF from "jspdf";

// import { Container } from './styles';

export default function PdfGenerator({
  vendedor,
  naturezaOperacao,
  cliente,
  values,
  produtos,
  parcelas
}) {
  const jsPdfGenerator = () => {
    var doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
      floatPrecision: 16
    });

    // set the font
    doc.setFont("Helveltica");
    //set the font type
    doc.setFontType("normal");
    console.log(jsPDF().getFontList());

    // Measures A4(pt): 595x842
    // Measures A4(mm): 210x297
    //doc.addImage(imgData, "JPEG", 15, 15, 44, 100);
    doc.rect(15, 15, 180, 267);
    doc.rect(15, 15, 40, 20); // logo
    doc.setLineWidth(0.3);
    doc.line(60, 20, 60, 30); // line
    doc.setLineWidth(0.1);
    doc.rect(65, 15, 80, 20); // agf information
    doc.rect(155, 15, 40, 20); // N pedido, data, ns
    doc.rect(15, 15, 180, 30);
    doc.rect(15, 15, 180, 30);
    doc.rect(15, 15, 180, 30);
    doc.rect(15, 15, 180, 108);
    doc.rect(15, 15, 180, 150);
    doc.rect(15, 15, 180, 200);

    doc.setFontSize("5");
    doc.setFontType("bold");
    doc.text(
      67,
      19,
      "AGF IMPORTAÇÃO, EXPORTAÇÃO E COMERCIALIZAÇÃO DE MÁQUINAS E ACESSÓRIOS LTDA"
    );
    doc.setFontType("normal");
    doc.text(
      50,
      26,
      "CNPJ: 11.681.470/0001-84 | INSCRIÇÃO ESTADUAL: 530.051.442.114"
    );
    doc.text(
      50,
      30,
      "MATRIZ: Rod. SP 346, km 202,5 - Distrito Industrial, Espirito Santo do Pinhal - SP"
    );
    doc.text(
      50,
      34,
      "FILIAL: Rod. Engenheiro Fabiano Vivacqua, 441, Marbrasa, Cachoeiro Itapemirim - ES"
    );
    doc.text(50, 38, "AGF Equipamentos - (19) 3888-5800");

    doc.setFontSize("12");

    // indexes 1 division
    doc.text(15, 100, "Razão Social: " + cliente.razao_social);
    doc.text(15, 115, "CNPJ: " + cliente.cnpj);
    doc.text(15, 130, "Endereço: " + cliente.endereco);
    doc.text(15, 145, "Bairro: " + cliente.bairro);
    doc.text(15, 160, "Telefone: " + cliente.telefone);
    doc.text(15, 175, "Nome Contato: " + values.nome_contato);
    doc.text(15, 190, "Email: " + values.email_contato);

    // indexes 2 division
    doc.text(350, 100, "CÓDIGO: " + cliente.codigo_cliente);
    doc.text(250, 115, "Inscrição Estadual: " + cliente.inscricao_estadual);
    doc.text(250, 130, "Município: " + cliente.municipio);
    doc.text(250, 145, "UF: " + cliente.uf);
    doc.text(250, 160, "CEP: " + cliente.cep);
    doc.text(250, 175, "Celular: " + cliente.celular);
    doc.text(250, 190, "Cargo do Contato: " + values.cargo_contato);

    //save the pdf
    //doc.save("generated.pdf");
    var string = doc.output("datauristring");
    var embed = "<embed width='100%' height='100%' src='" + string + "'/>";
    var x = window.open();
    x.document.open();
    x.document.write(embed);
    x.document.close();
  };

  return <button onClick={jsPdfGenerator}>Generate PDF</button>;
}
