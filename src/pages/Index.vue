<template>
  <q-page class="container">
    <q-table :data="dados" :columns="colunas" dark hide-header>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="ColunaUnica" :props="props"> {{ props.row.TipoServico }} </q-td>
          <q-td key="Acoes" align="right">
            <q-btn color="light-green-7" v-bind:id="idBTN" @click="mostrarServico(props.row.TipoServico)"> Selecionar </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="paginaServico">
      <div class="bg-teal">
        <q-table :columns="colunas" :data="servicos" hide-header>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="ColunaUnica" :props="props"> {{props.row.Nome}} </q-td>
              <q-td align="left"><q-btn color="light-green-7"> <q-icon name="navigate_next"/> </q-btn> </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </q-dialog>

  </q-page>
</template>

<style>
</style>

<script>
import { Promise } from 'q'
export default {
  name: 'PageIndex',
  data () {
    return {
      model: null,
      paginaServico: false,
      paginaAgencias: false,
      idBTN: 1,
      colunas: [
        { name: 'ColunaUnica', field: 'TipoServico', align: 'center' }
      ],
      dados: [
        { TipoServico: 'Financeiro' },
        { TipoServico: 'Cartão' },
        { TipoServico: 'Cheque' },
        { TipoServico: 'Conta' }
      ],
      servicos: [],
      estados: ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'],
      estadoEscolhido: '',
      agencias: []
    }
  },
  methods: {
    receberServicos (filtro) {
      return new Promise((resolve, reject) => {
        // Recebe todos os serviços disponiveis
        this.$axios.get("https://olinda.bcb.gov.br/olinda/servico/Informes_ListaTarifaPorValores/versao/v1/odata/ServicosBancarios?$top=10&$filter=contains(Nome%2C'" + filtro + "')&$format=json&$select=Codigo,Nome").then((resposta) => {
          resolve(resposta.data.value)
        })
      })
    },
    mostrarServico (tipo) {
      this.receberServicos(tipo).then(res => {
        this.servicos = res
        if (this.servicos.length !== 0) this.paginaServico = true
      })
      console.log(this.estadoEscolhido)
    }
  }
}
</script>
