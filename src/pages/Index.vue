<template>
  <q-page class="container">
    <q-select filled v-model="pessoa" @input="setPessoa(pessoa)" :options="options" label="Pessoa: Jurídica ou Física" />
    <tabela-tipo-servico/>
    <tabela-servicos/>
    <alerta-pessoa/>
    <alerta-taxa/>
    <alerta-servico/>
  </q-page>
</template>

<script>
import TabelaTipoServico from 'components/TabelaTipoServico'
import TabelaServicos from 'components/TabelaServicos'
import AlertaPessoa from 'components/AlertaPessoa'
import AlertaTaxa from 'components/AlertaTaxa'
import AlertaServico from 'components/AlertaServico'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PageIndex',
  components: {
    TabelaTipoServico,
    TabelaServicos,
    AlertaPessoa,
    AlertaTaxa,
    AlertaServico
  },
  data () {
    return {
      pessoa: '',
      options: ['Jurídica', 'Física']
    }
  },
  computed: {
    ...mapState('example', ['alertServico', 'taxas'])
  },
  methods: {
    ...mapMutations('example', ['setAlertServico', 'setPessoa'])
  }
}
</script>
