<template>
  <div>
    <q-dialog v-model="mostraAlertaServico">
      <q-card>
        <q-card-section>
          <div class="text-h6">Atenção</div>
        </q-card-section>

        <q-card-section>Desculpe. Este serviço não está disponível para o tipo de pessoa escolhida.</q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="light-green-7" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      mostraAlertaServico: false
    }
  },
  computed: {
    ...mapState('example', ['alertServico'])
  },
  watch: {
    alertServico (newValue, oldValue) {
      this.mostraAlertaServico = newValue
    },
    mostraAlertaServico (newValue, oldValue) {
      if (newValue === false) this.setAlertServico(false)
    }
  },
  methods: {
    ...mapMutations('example', ['setAlertServico'])
  }
}
</script>
