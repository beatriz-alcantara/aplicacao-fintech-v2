import { HTTPClient } from 'boot/axios'

const receberServicos = (filtro, pessoa) => {
  return new Promise((resolve) => {
    // Recebe todos os serviços disponiveis
    HTTPClient
      .get(
        `https://olinda.bcb.gov.br/olinda/servico/Informes_ListaValoresDeServicoBancario/versao/v1/odata/ListaValoresServicoBancario(PessoaFisicaOuJuridica=@PessoaFisicaOuJuridica,CodigoGrupoConsolidado=@CodigoGrupoConsolidado)?@PessoaFisicaOuJuridica='${pessoa}'&@CodigoGrupoConsolidado='11'&$top=100&$filter=contains(NomeServico%2C'${filtro}')&$format=json&$select=NomeServico,ValorMinimo,ValorMaximo,ValorMedio`
      )
      .then(resposta => {
        resolve(resposta.data.value)
      })
  })
}

const mostrarServico = (context, tipo) => {
  if (context.state.model === '') {
    context.commit('setAlertPessoa')
    return
  }
  receberServicos(tipo, context.state.model.charAt(0)).then(res => {
    context.commit('setServicos', res)
    if (context.state.servicos.length !== 0 && context.state.model !== '') context.commit('setPaginaServico', true)
    else if (context.state.servicos.length === 0) context.commit('setAlertServico', true)
  })
}

const mostrarTaxa = (context, servico) => {
  HTTPClient
    .get(
      `https://olinda.bcb.gov.br/olinda/servico/Informes_ListaValoresDeServicoBancario/versao/v1/odata/ListaValoresServicoBancario(PessoaFisicaOuJuridica=@PessoaFisicaOuJuridica,CodigoGrupoConsolidado=@CodigoGrupoConsolidado)?@PessoaFisicaOuJuridica='${context.getters.tipoPessoa}'&@CodigoGrupoConsolidado='11'&$top=100&$filter=NomeServico%20eq%20'${servico}'&$orderby=NomeServico%20asc&$format=json&$select=NomeServico,ValorMinimo,ValorMaximo,ValorMedio`
    )
    .then(resposta => {
      context.commit('setTaxas', resposta.data.value)
      console.log(context.state.taxas)
      if (context.state.taxas !== []) {
        context.commit('setDTaxa', true)
      }
    })
}
export { receberServicos, mostrarServico, mostrarTaxa }
