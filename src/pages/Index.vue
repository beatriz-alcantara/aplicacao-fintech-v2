<template>
  <q-page class="container">
    <q-select filled v-model="model" :options="options" label="Pessoa: Jurídica ou Física" />
    <tabela-tipo-servico/>
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

    <q-dialog v-model="alertPessoa">
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
export default {
  name: 'PageIndex',
  components: {
    TabelaTipoServico
  },
  data () {
    return {
      paginaServico: false,
      model: '',
      taxas: [''],
      alertPessoa: false,
      alertServico: false,
      dTaxa: false,
      options: ['Jurídica', 'Física'],
      servicos: []
    }
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
