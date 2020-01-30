export function toggleSeller(
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
) {
  return {
    type: "TOGGLE_CLIENT",
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
  };
}
