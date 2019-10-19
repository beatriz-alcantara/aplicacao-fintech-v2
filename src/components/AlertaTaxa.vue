<template>
  <div v-if="taxas.length !== 0">
    <q-dialog v-model="alertTaxa">
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
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      alertTaxa: false
    }
  },
  computed: {
    ...mapState('example', ['dTaxa', 'taxas'])
  },
  watch: {
    dTaxa (newValue, oldValue) {
      this.alertTaxa = newValue
    },
    alertTaxa (newValue, oldValue) {
      if (newValue === false) this.setDTaxa(false)
    }
  },
  methods: {
    ...mapMutations('example', ['setDTaxa'])
  }
}
</script>
