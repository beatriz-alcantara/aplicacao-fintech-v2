<template>
  <q-table :data="dados" :columns="colunas" dark hide-header>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="ColunaUnica" :props="props">{{ props.row.TipoServico }}</q-td>
        <q-td key="Acoes" align="right">
          <q-btn
            color="light-green-7"
            @click="mostrarServico(props.row.TipoServico.slice(1), model.charAt(0))"
          >Selecionar</q-btn>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'TabelaTipoServico',
  data () {
    return {
      colunas: [{ name: 'ColunaUnica', field: 'TipoServico', align: 'center' }],
      dados: [
        { TipoServico: 'Financeiro' },
        { TipoServico: 'Cartão' },
        { TipoServico: 'Cheque' },
        { TipoServico: 'Conta' },
        { TipoServico: 'Crédito' },
        { TipoServico: 'Especial' },
        { TipoServico: 'Cadastro' },
        { TipoServico: 'Cambio' },
        { TipoServico: 'Cobrança' },
        { TipoServico: 'Moeda' },
        { TipoServico: 'Comum' },
        { TipoServico: 'Depositante' },
        { TipoServico: 'Depósito' },
        { TipoServico: 'Ficha' },
        { TipoServico: 'Cópias' },
        { TipoServico: 'Título' },
        { TipoServico: 'Débito' },
        { TipoServico: 'Eletronico' },
        { TipoServico: 'DOC' },
        { TipoServico: 'Entrada' },
        { TipoServico: 'Envelopamento' },
        { TipoServico: 'Envio' },
        { TipoServico: 'Exportação' },
        { TipoServico: 'Importação' },
        { TipoServico: 'Movimentação' },
        { TipoServico: 'Pagamento' },
        { TipoServico: 'Pacote' },
        { TipoServico: 'Renegociação' },
        { TipoServico: 'Ressarcimento' },
        { TipoServico: 'Saque' },
        { TipoServico: 'Transferencia' },
        { TipoServico: 'Utilização' }
      ]
    }
  },
  methods: {
    mostrarServico (tipo, pessoa) {
      this.receberServicos(tipo, pessoa).then(res => {
        this.servicos = res
        if (this.servicos.length !== 0 && this.model !== '') { this.paginaServico = true }
        if (this.model === '') this.alertPessoa = true
        else if (this.servicos.length === 0) this.alertServico = true
      })
    },
    receberServicos (filtro, pessoa) {
      return new Promise((resolve, reject) => {
        // Recebe todos os serviços disponiveis
        this.$axios
          .get(
            `https://olinda.bcb.gov.br/olinda/servico/Informes_ListaValoresDeServicoBancario/versao/v1/odata/ListaValoresServicoBancario(PessoaFisicaOuJuridica=@PessoaFisicaOuJuridica,CodigoGrupoConsolidado=@CodigoGrupoConsolidado)?@PessoaFisicaOuJuridica='${pessoa}'&@CodigoGrupoConsolidado='11'&$top=100&$filter=contains(NomeServico%2C'${filtro}')&$format=json&$select=NomeServico,ValorMinimo,ValorMaximo,ValorMedio`
          )
          .then(resposta => {
            resolve(resposta.data.value)
          })
      })
    }
  }
}
</script>
