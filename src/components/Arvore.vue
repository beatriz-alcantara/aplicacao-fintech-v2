<template>
  <div class="q-pa-md bg-grey-10 text-white">
    <q-tree :nodes="bancos" node-key="Inst" default-expand-all>
      <template v-slot:default-header="prop">
        <div class="row items-center">
          <q-icon
            :name="prop.node.icon || 'account_balance'"
            color="light-green-7"
            size="28px"
            class="q-mr-sm"
          />
          <div
            v-if="prop.node.NomeAgencia"
            class="text-weight-bold text-white"
          >{{ prop.node.NomeAgencia }}</div>
          <div v-else class="text-weight-bold text-white">Sem Nome</div>
        </div>
      </template>

      <template v-slot:default-body="prop">
        <div v-if="prop.node.Endereco">
          <span class="text-weight-bold text-white">Bairro</span>
          : {{ prop.node.Bairro }}
          <br />
          <span class="text-weight-bold text-white">Rua</span>
          : {{ prop.node.Endereco }}
          <br />
          <span class="text-weight-bold text-white">Número</span>
          : {{ prop.node.Numero }}
          <br />
          <span class="text-weight-bold text-white">Municipio</span>
          : {{ prop.node.Municipio }}
        </div>
        <span v-else class="text-weight-light text-white"></span>
      </template>
    </q-tree>
  </div>
</template>

<script>
export default {
  name: 'Arvore',
  data () {
    return {
      bancos: []
    } // return
  }, // data
  mounted () {
    this.getAgencias()
  },
  methods: {
    getAgencias () {
      this.$q.loading.show()
      this.$axios
        .get(
          "https://olinda.bcb.gov.br/olinda/servico/Informes_Agencias/versao/v1/odata/Agencias?$top=550&$filter=UF%20eq%20'PA'&$orderby=NomeIf%20asc&$format=json&$select=NomeIf,NomeAgencia,Endereco,Numero,Bairro,Cep,Municipio,UF,DDD,Telefone"
        )
        .then(res => {
          console.log('getAgencias => res', res)
          let instituicoes = [
            ...new Set(res.data.value.map(obj => obj.NomeIf))
          ]

          instituicoes.forEach(NomeIf => {
            let children = res.data.value.filter(obj => obj.NomeIf === NomeIf)
            this.bancos.push({
              Inst: NomeIf,
              icon: 'home',
              children: children
            })
          })
          this.$q.loading.hide()
        })
        .catch(err => {
          console.error(err)
          this.$q.loading.hide()
        })
    }
  }
}
</script>

<style>
</style>
