function setPessoa (state, valor) {
  state.model = valor
  console.log('model', state.model)
}

function setAlertPessoa (state) {
  state.alertPessoa = !state.alertPessoa
}

const setServicos = (state, valor) => {
  console.log('Executou setServiccos', valor)
  state.servicos = valor
}

const setPaginaServico = (state, valor) => {
  state.paginaServico = valor
}

const setAlertServico = (state) => {
  state.alertServico = !state.alertServico
}

export {
  setPessoa,
  setAlertPessoa,
  setServicos,
  setPaginaServico,
  setAlertServico
}
