<template>
  <div>
    <q-dialog v-model="mostrarAlertaPessoa">
      <q-card>
        <q-card-section>
          <div class="text-h6">Atenção</div>
        </q-card-section>

        <q-card-section>Selecione o tipo de pessoa (Física ou Jurídica)</q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="light-green-7" v-close-popup />
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
      mostrarAlertaPessoa: false
    }
  },
  computed: {
    ...mapState('example', ['alertPessoa'])
  },
  watch: {
    alertPessoa (newValue, oldValue) {
      this.mostrarAlertaPessoa = newValue
    },
    mostrarAlertaPessoa (newValue, oldValue) {
      if (newValue === false) this.setAlertPessoa()
    }
  },
  methods: {
    ...mapMutations('example', ['setAlertPessoa'])
  }
}
</script>
