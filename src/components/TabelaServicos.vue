<template>
  <q-dialog v-model="paginaServico">
      <div class="bg-teal">
        <q-table :columns="colunas" :data="servicos" hide-header>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="ColunaUnica" :props="props">{{props.row.NomeServico}}</q-td>
              <q-td align="left">
                <q-btn
                  color="light-green-7"
                  @click="mostrarTaxa(props.row.NomeServico, model.charAt(0))"
                >
                  <q-icon name="navigate_next" />
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </q-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      colunas: [{ name: 'ColunaUnica', field: 'TipoServico', align: 'center' }]
    }
  },
  computed: {
    ...mapState('example', ['paginaServico', 'model', 'servicos'])
  },
  methods: {
    mostrarTaxa (servico, pessoa) {
      this.$axios
        .get(
          `https://olinda.bcb.gov.br/olinda/servico/Informes_ListaValoresDeServicoBancario/versao/v1/odata/ListaValoresServicoBancario(PessoaFisicaOuJuridica=@PessoaFisicaOuJuridica,CodigoGrupoConsolidado=@CodigoGrupoConsolidado)?@PessoaFisicaOuJuridica='${pessoa}'&@CodigoGrupoConsolidado='11'&$top=100&$filter=NomeServico%20eq%20'${servico}'&$orderby=NomeServico%20asc&$format=json&$select=NomeServico,ValorMinimo,ValorMaximo,ValorMedio`
        )
        .then(resposta => {
          this.taxas = resposta.data.value
          console.log(this.taxas)
        })
      console.log(this.taxas)
      if (this.taxas !== ['']) this.dTaxa = true
    }
  }
}
</script>
