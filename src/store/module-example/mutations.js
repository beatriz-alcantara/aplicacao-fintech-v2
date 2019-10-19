function setPessoa (state, valor) {
  state.model = valor
}

function setAlertPessoa (state) {
  state.alertPessoa = !state.alertPessoa
}

const setServicos = (state, valor) => {
  state.servicos = valor
}

const setPaginaServico = (state, valor) => {
  state.paginaServico = valor
}

const setAlertServico = (state) => {
  state.alertServico = !state.alertServico
}

const setDTaxa = (state, valor) => {
  state.dTaxa = valor
}

const setTaxas = (state, valor) => {
  state.taxas = valor
}

export {
  setPessoa,
  setAlertPessoa,
  setServicos,
  setPaginaServico,
  setAlertServico,
  setDTaxa,
  setTaxas
}
