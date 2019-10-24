<template>
  <div>
    <q-dialog v-model="mostrarPaginaServico">
        <div class="bg-teal">
          <q-table :columns="colunas" :data="servicos" hide-header>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="ColunaUnica" :props="props">{{props.row.NomeServico}}</q-td>
                <q-td align="left">
                  <q-btn
                    color="light-green-7"
                    @click="mostrarTaxa(props.row.NomeServico)"
                  >
                    <q-icon name="navigate_next" />
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      colunas: [{ name: 'ColunaUnica', field: 'Servico', align: 'center' }],
      mostrarPaginaServico: false
    }
  },
  computed: {
    ...mapState('example', ['servicos', 'paginaServico'])
  },
  watch: {
    paginaServico (newValue, oldValue) {
      this.mostrarPaginaServico = newValue
    },
    mostrarPaginaServico (newValue, oldValue) {
      if (newValue === false) this.setPaginaServico(false)
    }
  },
  methods: {
    ...mapActions('example', ['mostrarTaxa']),
    ...mapMutations('example', ['setPaginaServico'])
  }
}
</script>
