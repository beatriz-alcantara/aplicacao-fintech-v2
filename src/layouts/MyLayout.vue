<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-light-green-7">
        <q-btn
          flat
          dense
          round
          @click="drawer = !drawer"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Guia de Serviços e Agências
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

     <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="1000"
        bordered
        content-class="bg-green-1"
      >
          <q-list class="text-light-green-7">
            <q-item clickable  v-ripple to="/" exact >
              <q-item-section avatar>
                <q-icon name="account_balance_wallet"/>
              </q-item-section>
              <q-item-section>
                Serviços
              </q-item-section>
            </q-item>

           <q-separator  />

           <q-item clickable v-ripple to="/Bancos" exact>
              <q-item-section avatar>
                <q-icon name="account_balance"/>
              </q-item-section>
              <q-item-section>
                Bancos
              </q-item-section>
            </q-item>

           <q-separator />

          </q-list>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'MyLayout',
  data () {
    return {
      drawer: false,
      menuList: [
        {
          icon: 'account_balance_wallet',
          label: 'Serviços',
          separator: true
        },
        {
          icon: 'account_balance',
          label: 'Bancos',
          separator: true
        }
      ]
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
