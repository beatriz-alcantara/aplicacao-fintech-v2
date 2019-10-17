<template>
  <q-page class="container">
    <q-select filled v-model="pessoa" @input="setPessoa(pessoa)" :options="options" label="Pessoa: Jurídica ou Física" />
    <tabela-tipo-servico/>
    <tabela-servicos/>
    <q-dialog v-model="alertPessoa">
      <q-card>
        <q-card-section>
          <div class="text-h6">Atenção</div>
        </q-card-section>

        <q-card-section>Selecione o tipo de pessoa (Física ou Jurídica)</q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="light-green-7" v-close-popup="1" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="alertServico">
      <q-card>
        <q-card-section>
          <div class="text-h6">Atenção</div>
        </q-card-section>

        <q-card-section>Desculpe. Este serviço não está disponível para o tipo de pessoa escolhida.</q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="light-green-7" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dTaxa">
      <q-card class="my-card bg-light-green-6 text-white">
        <q-card-section>
          <div class="text-h6">Taxas por Serviço</div>
        </q-card-section>

        <q-card-section>
          <p>Taxa Mínima: R$ {{ taxas[0].ValorMinimo}}</p>
          <p>Taxa Maxima: R$ {{ taxas[0].ValorMaximo}}</p>
          <p>Taxa Média: R$ {{ taxas[0].ValorMedio}}</p>
        </q-card-section>

        <q-separator dark />

        <q-card-actions align="right">
          <q-btn flat v-close-popup>OK</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import TabelaTipoServico from 'components/TabelaTipoServico'
import TabelaServicos from 'components/TabelaServicos'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PageIndex',
  components: {
    TabelaTipoServico,
    TabelaServicos
  },
  data () {
    return {
      pessoa: '',
      taxas: [''],
      dTaxa: false,
      options: ['Jurídica', 'Física']
    }
  },
  computed: {
    get () {
      return {
        ...mapState('example', ['alertServico', 'alertPessoa'])
      }
    },
    set: {
      ...mapMutations('example', ['setAlertPessoa', 'setAlertServico'])
    }
  },
  methods: {
    ...mapMutations('example', ['setPessoa'])
  }
}
</script>
