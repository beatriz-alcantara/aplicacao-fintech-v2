<template>
  <q-table :data="dados" :columns="colunas" dark hide-header>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="ColunaUnica" :props="props">{{ props.row.TipoServico }}</q-td>
        <q-td key="Acoes" align="right">
          <q-btn
            color="light-green-7"
            @click="mostrarServico(props.row.TipoServico.slice(1))"
          >Selecionar</q-btn>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
  computed: {
    ...mapState('example', ['model', 'servico'])
  },
  methods: {
    ...mapActions('example', ['mostrarServico'])
  }
}
</script>
