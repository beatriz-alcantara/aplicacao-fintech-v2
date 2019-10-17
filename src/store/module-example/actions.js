import { HTTPClient } from 'boot/axios'
const receberServicos = (filtro, pessoa) => {
  // console.log('filtro', filtro)
  // console.log('pessoa', pessoa)
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
  // receberServicos(tipo, context.state.model.charAt(0))
  receberServicos(tipo, context.state.model.charAt(0)).then(res => {
    // context.state.servicos = res
    context.commit('setServicos', res)
    if (context.state.servicos.length !== 0 && context.state.model !== '') { context.commit('setPaginaServico', true) }
    if (context.state.model === '') context.commit('setAlertPessoa')
    else if (context.state.servicos.length === 0) context.commit('setPaginaServico', true)
  })
}

export { receberServicos, mostrarServico }
